'use strict';
const autoBind = require( 'auto-bind' );
const { Services } = require( './Services' );
const nodemailer = require('nodemailer');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



class User extends Services {



  /**
   * Service constructor
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
      //console.log(logger)
      autoBind( this );
  }



  async usersListService (req, res) {
    // Save User to Database
    var lang =  getLocale();

    try {

      var name = 'name';
      var order = 'id';
      var ordering = 'ASC';
      var queries = req.query;
      var offset = 0;
      var limit = 100;
      const query = [];
      const innerQuery = [];

      if(req.query.limit) {
        limit = req.query.limit
      }

      if(req.query.page) {
        if(req.query.page > 1) {
          offset = req.query.page * limit - limit;
        }
      }

      if(req.query.orderby) {
        order = req.query.orderby
      }

      if(req.query.ordering) {
        ordering = req.query.ordering
      }

      if(req.query.keyword) {
        innerQuery.push({
          [name]: {
            [this.Op.iLike]: `%${req.query.keyword}%`
          }
        })
      }

      if(req.query.keyword) {
        query.push({
          phone: {
            [this.Op.iLike]: `%${req.query.keyword}%`
          }
        })
      }

      if(req.query.keyword) {
        query.push({
          email: {
            [this.Op.iLike]: `%${req.query.keyword}%`
          }
        })
      }

      return await this.User.findAll({
        where: {          
          [this.Op.and]: query
        },
        include: [
          {
            model: this.UserTranslation,
            as: 'translations',
            required: false,
            where: {
              lang: {
                [this.Op.or]: [lang, 'en']
              }
            },
            limit: 1
          },
          {
            model: this.Role,
            as: 'roles',
            required: false,
            include: [
              {
                model: this.RoleTranslation,
                as: 'translations',
                required: false,
                where: {
                  lang: {
                    [this.Op.or]: [lang, 'en']
                  }
                },
                limit: 1
              }
            ]
          }
        ],
        order: [
          [order, ordering],
        ],
        offset: offset, limit: limit,
      });
    
    } catch (ex) {    
      
      throw new Error(ex);
    
    }

  }



  async usersDetailsService (req, res) {

    try {      
      var lang =  getLocale();
      return await this.User.findOne({
        where: {          
          id: req.params.id
        },
        include: [
          {
            model: this.UserTranslation,
            as: 'translations',
            required: false,            
          }
        ]
      });
    
    } catch (ex) {    
      
      throw new Error(ex);
    
    }

  }



  async userUpdate (req, res) {
    
    var lang =  getLocale();

    const t = await this.db.sequelize.transaction();

    try {

      // Then, we do some calls passing this transaction as an option:

      const [numberOfAffectedRows, affectedRows] = await this.User.update({ 
        phone: req.body.phone,
        email: req.body.email,
      }, {
        where: {id: req.params.id},
        returning: true, // needed for affectedRows to be populated
        plain: true // makes sure that the returned instances are just plain objects
      });
      var namesData = req.body.name;
      for (let index of Object.keys(namesData)) {
        var userTranslation = await this.UserTranslation.findOne({where: {user_id: req.params.id, lang: index}});
        console.log(JSON.parse(JSON.stringify(userTranslation)))
        if(userTranslation.id) {
          await this.UserTranslation.update(
            {name: namesData[index], updated_at: new Date()},
            {returning: true, plain: true, where: {user_id: req.params.id, lang: index}}
          )
        } else
          await this.UserTranslation.create({ name: namesData[index], lang: index, user_id: req.params.id, status: true, created_at: new Date(), updated_at: new Date() });
      };

      t.commit();
      return true;
    
    } catch (ex) {
    
      t.rollback();
      throw new Error(ex);
    
    }

  }



  async userStore (req, res) {

    const t = await this.db.sequelize.transaction();

    try {

      // Then, we do some calls passing this transaction as an option:

      const user = await this.User.create({ 
        phone: req.body.phone,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        status: true, 
        created_at: new Date(), 
        updated_at: new Date()
      });
      var namesData = req.body.name;
      for (let index of Object.keys(namesData)) {
        await this.UserTranslation.create({ name: namesData[index], lang: index, user_id: user.id, status: true, created_at: new Date(), updated_at: new Date() });
      };

      t.commit();
      return true;
    
    } catch (ex) {
    
      t.rollback();
      throw new Error(ex);
    
    }

  }

}

module.exports = { User };
