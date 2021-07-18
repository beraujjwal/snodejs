'use strict';
const autoBind = require( 'auto-bind' );
const { Services } = require( './Services' );
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



class Auth extends Services {



  /**
   * Auth Service constructor
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
      autoBind( this );
  }


  /**
   * @description Attempt to user signup service with the provided object
   * @author Ujjwal Bera
   * @param req object
   * @param res object
   * @return json object
   */
  async signupService(req, res) {
    // Save User to Database
    let lang =  getLocale();
    
    const t = await this.db.sequelize.transaction();
    let user = null;
    let token = null;
    try {
      //Registering new user
      user = await this.User.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        status: true,
        verified: false
      });
      
      //Creating & storing activation token for current registering user
      token = await this.crypto.randomBytes(64).toString('hex');
      let dt = new Date();
      dt.setSeconds( dt.getSeconds() + parseInt(this.env.RESET_PASSWORD_TOKEN_EXPIRES_IN) );
      await this.VerificationToken.create({
        user_id: user.id,
        token: token,
        type: 'signup',
        status: true,
        expire_at: dt,
      });

      //Managing roles for current registering user
      let roles = [3];
      if (req.body.roles) {
        roles = await this.Role.findAll({
          where: {
            slug: {
              [this.Op.or]: req.body.roles
            }
          }
        });
      }
      await user.setRoles(roles);
      t.commit();

      //Sending activation mail to the current registering user
      let activation_link = this.env.APP_URL + '/auth/active/' + user.phone + '/' + token;
      user.activate = activation_link;
      //console.log(this.mailer);
      /*this.mailer.send({
        to: req.body.email,
        subject: 'Welcome',
        html: 'Please click <a href="' + activation_link + '"> here </a> to activate your account.'
      });*/
      console.log(activation_link);
      let signupRes = { user: user }
      return signupRes;

    } catch (error) {
      t.rollback();
      throw new Error(error);
    }
  }



  /**
   * @description Attempt to user login with the provided object
   * @param req {object} Object containing all required fields to do user login
   * @param res {object} Object containing all required fields to do user login
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, data: *}>}
   */
  async signinService(req, res) {
    //logger.info("Request recieved at /test", req.body)
    var lang =  getLocale();
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    try {
      const { username, password } = req.body;
      var criteria = (username.match(regexEmail)) ? {email: username, status: true, verified: true} : {phone: username, status: true,verified: true};

      var user = await this.User.findOne({
        where: criteria,
        include: [
          {
            model: this.UserTranslation,
            as: 'translation',
            required: false,
            where: {
              lang: {
                [this.Op.or]: [lang, 'en']
              }
            }
          },
          {
              model: this.Role,
              as: 'roles',
              required: true,
          }
        ]
      });

      if (!user) {
        throw new Error(__('LOGIN_INVALID_USERSNAME_PASSWORD'))
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        throw new Error(__('LOGIN_INVALID_USERSNAME_PASSWORD'));
      }
      
      const token = jwt.sign({ id: user.id, phone: user.phone, email: user.email }, this.env.JWT_SECRET, {
        expiresIn: this.env.JWT_EXPIRES_IN, // expiresIn time
        algorithm: 'HS256'
      });

      const refreshToken = jwt.sign({ id: user.id, phone: user.phone, email: user.email }, this.env.JWT_REFRESH_TOKEN_SECRET, { 
        expiresIn: this.env.JWT_REFRESH_IN, // expiresIn time
        algorithm: 'HS256'
      })

      var loginRes = { user: user, accessToken: token, expiresIn: this.env.JWT_EXPIRES_IN, refreshToken: refreshToken }
      return loginRes;
    } catch (ex) {
      throw new Error(ex);
    }
  }


  /**
   * @description Attempt to user activate with the provided object
   * @param req {object} Object containing all required data to do user activate
   * @param res {object}
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, data: *}>}
   */
  async activateService(req, res) {


    var username = req.params.username;
    var token =  req.params.token;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var criteria = (username.match(regexEmail)) ? {email: username} : {phone: username};

    try {
      var user = await this.User.findOne({
        where: criteria,
      });

      if(user == null){
        throw new Error(`User not found.`);
      }

      if (user.verified) {
        throw new Error(`User already verified.`);
      }

      var foundToken = await this.VerificationToken.findOne({
        where: { token: token, type: 'signup', status: true }
      });

      if(foundToken == null){
        throw new Error(`Verification token not found.`);
      }

      await user.update({ verified: true }).catch(reason => {
        throw new Error(reason);
      });

      await foundToken.update({ status: false }).catch(reason => {
        throw new Error(reason);
      });

      //`User with ${inputDetails.field} ${inputDetails.value} has been verified`

      var activateRes = { status: true, message: `Your Account has been activated successfully.` }
      return activateRes;

    } catch (ex) {
      throw new Error(ex);
    }

  }



  async resetPasswordService(req, res) {
    const username = req.body.username
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var criteria = (username.match(regexEmail)) ? {email: username} : {phone: username};
    try {
      var user = await this.User.findOne({
        where: criteria, //checking if the email address or phone sent by client is present in the db(valid)
      });

      if(user == null){
        throw new Error(`User not found.`);
      }

      var verificationToken = await this.VerificationToken.findOne({
        where: {user_id: user.id, type: 'reset_password'},
      })

      if (verificationToken != null) {
        this.VerificationToken.destroy({
          where: {
              id: verificationToken.id
          }
        })
      }

      var token = this.crypto.randomBytes(64).toString('hex'); //creating the token to be sent to the forgot password form (react)
      await bcrypt.hash(token, null, null, function (err, hash) {//hashing the password to store in the db node.js
        console.log(this.env.RESET_PASSWORD_TOKEN_EXPIRES_IN)
        var dt = new Date();
        dt.setSeconds( dt.getSeconds() + parseInt(this.env.RESET_PASSWORD_TOKEN_EXPIRES_IN) );
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


    } catch (ex) {
      throw new Error(ex);
    }
  }
}

module.exports = { Auth };
