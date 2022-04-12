const autoBind = require('auto-bind');
const bcrypt = require('bcryptjs');
const { service } = require('@service/service');
const {
  generatePassword,
  generateOTP,
  generateToken,
} = require('../helpers/utility');

class user extends service {
  /**
   * user service constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor(model) {
    super(model);
    this.model = this.db[model];
    this.role = this.db['Role'];
    this.token = this.db['VerificationToken'];
    this.regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    autoBind(this);
  }

  async singup({ name, email, phone, password, roles, verified, status }) {
    // Save User to Database
    let lang =  getLocale();

    const t = await this.db.sequelize.transaction();
    try {
      //Registering new user
      const user = await this.model.create({
        name: name,
        phone: phone,
        email: email,
        password: bcrypt.hashSync(password, 8),
        status: status || false,
        verified: verified || false
      }, { transaction: t });

      //Creating & storing activation token for current registering user
      const token = await generateToken({
        name: name,
        phone: phone,
        email: email,
      });

      const otpToken = await generateOTP(6, {
        digits: true,
      });

      await this.token.create({
        user_id: user.id,
        token: token,
        type: 'signup',
        status: true,
        expire_at: new Date(Date.now() + 60 * 60 * 1000),
      }, { transaction: t });

      //Managing roles for current registering user
      let rolesSet = [3];
      /*if (roles) {
		  console.log(roles);
        rolesSet = await this.role.findAll({
          where: {
            slug: roles
          }
        });
      }*/
	  console.log(roles);
      await user.setRoles(rolesSet, { transaction: t });
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
		this.errorLog(error)
		t.rollback();
		throw new Error(error);
    }
  }
}

module.exports = { user };
