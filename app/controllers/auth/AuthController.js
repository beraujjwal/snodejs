'use strict';
const autoBind = require( 'auto-bind' );
const { Controller } = require( '../Controller' );
const { Auth } = require('../../services/Auth');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


class AuthController extends Controller {



  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor( ) {
      super( );
      this.User = this.db.User;
      this.Role = this.db.Role;
      this.UserRole = this.db.UserRole;
      this.UserTranslation = this.db.UserTranslation;
      this.RoleTranslation = this.db.RoleTranslation;
      this.Permission = this.db.Permission;
      this.RolePermission = this.db.RolePermission;
      this.VerificationToken = this.db.VerificationToken;
      this.Auth = new Auth();
      autoBind( this );
  }



  async signup (req, res) {
    
    try {

      var signupRes = await this.Auth.signupService(req, res);
      res.status(res.statusCode).json(this.Response.success( __('REGISTER_SUCCESS'), signupRes, res.statusCode));

    } catch ( err ) {
      res.status(res.statusCode).json(this.Response.error( err.message, 404));
    }

  };



  async signupForm(req, res, next) {    
    let formData = req.locals.formData;
    res.render('admin/users/signup', { title: 'Sign Up', msg: 'Sign Up with your regular account', error: false, formData: formData })

  }



  async signupProcess(req, res, next) {

    try {      
      var signupRes = await this.Auth.signupService(req, res);
      if(signupRes) {
        req.flash('success', __('SIGNUP_SUCCESS'))
        res.redirect("/auth/signin");
      }else {
        res.redirect("/auth/signup");
      }
    } catch ( err ) {
      req.flash('error', err.message)
      res.redirect("/auth/signup");
    }

  }



  async signinForm(req, res, next) {
    let formData = req.locals.formData;
    res.render('admin/users/signin', { title: 'Sign In', msg: 'Sign in with your regular account', error: false, formData: formData })
  }



  async signinProcess(req, res, next) {

    try {

      var signinRes = await this.Auth.signinService(req, res);
      if(signinRes) {
        req.session.loggedin = true;
				req.session.user = signinRes.user;
        req.flash('success', __('LOGIN_SUCCESS'))
        res.redirect("/admin/dashboard");
      }else {
        req.flash('error', 'Invalid username/password')
        res.redirect('/auth/signin');
      }
    } catch ( err ) {
      req.flash('error', err.message)
      res.redirect('/auth/signin');
    }

    //res.status(200).json(this.Response.success( __('LOGIN_SUCCESS'), loginRes, res.statusCode));

  }



  async signin(req, res, next) {

    try {

      var loginRes = await this.Auth.signinService(req, res);
      res.status(res.statusCode).json(this.Response.success( __('LOGIN_SUCCESS'), loginRes, res.statusCode));

    } catch ( err ) {
      res.status(res.statusCode).json(this.Response.error( err.message, 404));
    }

  }



  async activateProcess(req, res) {

    try {

      var activate = await this.Auth.activateService(req, res);
      if(activate.status) {
        req.flash('success', activate.message)
        res.redirect("/auth/signin");
      } else {
        
      }
      

    } catch ( err ) {
      req.flash('error', err.message)
      res.redirect('/auth/signup');
    }

  }



  async activate(req, res) {

    try {

      var activate = await this.Auth.activateService(req, res);
      res.status(res.statusCode).json(this.Response.success( __('LOGIN_SUCCESS'), activate, res.statusCode));

    } catch ( err ) {
      console.log(err.message);
      res.status(res.statusCode).json(this.Response.error( err.message, 404));
    }

  }



  async forgetPasswordForm(req, res, next) {
    let formData = req.locals.formData;
    res.render('admin/users/forget_password', { title: 'Forget Password', msg: 'Sign in with your regular account', error: false, formData: formData })
  }



  async reset_password(req, res) {
    const username = req.body.username
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var criteria = (username.match(regexEmail)) ? {email: username} : {phone: username};

    this.User.findOne({
      where: criteria, //checking if the email address or phone sent by client is present in the db(valid)
    })
    .then(function (user) {
      if (!user) {
          return throwFailed(res, 'No user found with that email address.')
      }
      this.VerificationToken.findOne({
              where: {user_id: user.id, type: 'reset_password'},
        }).then(function (verificationToken) {

        if (verificationToken) {
          this.VerificationToken.destroy({
            where: {
                id: verificationToken.id
            }
          })
        }
        var token = this.crypto.randomBytes(64).toString('hex'); //creating the token to be sent to the forgot password form (react)
        bcrypt.hash(token, null, null, function (err, hash) {//hashing the password to store in the db node.js
          console.log(this.env.RESET_PASSWORD_TOKEN_EXPIRES_IN)
          var dt = new Date();
          dt.setSeconds( dt.getSeconds() + this.env.RESET_PASSWORD_TOKEN_EXPIRES_IN );
          this.VerificationToken.create({
                user_id: user.id,
                token: hash,
                type: 'reset_password',
                status: true,
                expire_at: dt,
            }).then(function (item) {
                if (!item)
                    return throwFailed(res, 'Oops problem in creating new password record')
                let mailOptions = {
                    to: user.email,
                    subject: 'Reset your account password',
                    html: '<h4><b>Reset Password</b></h4>' +
                    '<p>To reset your password, complete this form:</p>' +
                    '<a href=' + config.clientUrl + 'reset/' + user.id + '/' + token + '">' + config.clientUrl + 'reset/' + user.id + '/' + token + '</a>' +
                    '<br><br>' +
                    '<p>--Team</p>'
                }

                this.mailer.send(mailOptions);

                let mailSent = sendMail(mailOptions)//sending mail to the user where he can reset password.User id and the token generated are sent as params in a link
                if (mailSent) {
                    return res.json({success: true, message: 'Check your mail to reset your password.'})
                } else {
                    return throwFailed(error, 'Unable to send email.');
                }
            })
        })
      });
    })
  };
}

module.exports = new AuthController( );
