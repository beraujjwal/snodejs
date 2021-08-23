'use strict';
const { Controller } = require( './Controller' );
const autoBind = require( 'auto-bind' );
const { Attributes } = require('../services/Attributes');



class AttributesController extends Controller {



  /**
   * @desc Controller constructor
   * 
   * @author Ujjwal Bera
   * @param null
   */
  constructor( ) {
      super( );        
      this.Attribute = this.db.Attribute;
      this.AttributeOption = this.db.AttributeOption;
      this.Attributes = new Attributes();
      autoBind( this );
  }



  /**
   * @desc Get list of attribute for admin user
   *
   * @param req : request
   * @param res : response
   * @param next
   * @returns {Promise<*>}
   */
  async adminShowAttributesList(req, res, next) {
    try {
      var result = await this.Attributes.adminAttributes(req, res);
      console.log(result);
      res.render('admin/attributes/attributes', { title: 'Attributes', msg: 'Attribute List', result: result });
    } catch ( err ) {
      req.flash('error', err.message)
      res.redirect("/admin/attributes");
    }
  }



  /**
   * @desc Get attribute details for admin user
   *
   * @param req : request
   * @param res : response
   * @param next
   * @returns {Promise<*>}
   */
  async adminAttributeDetails(req, res, next) {
    try {
      var data = await this.Attributes.adminAttributeDetails(req, res);
      res.render('admin/attributes/details', { title: 'Attributes', msg: 'Attribute Details', data: data });
    } catch ( err ) {
      req.flash('error', err.message)
      res.redirect("/admin/attributes");
    }
  }



  /**
   * @desc Add attribute form for admin user
   *
   * @param req : request
   * @param res : response
   * @param next
   * @returns {Promise<*>}
   */
  async adminAddAttribute(req, res, next) {
    try {
      let formData = req.locals.formData;
      res.render('admin/attributes/add', { title: 'Attributes', msg: 'Attribute Add', error: false, formData: formData });
    } catch ( err ) {
      req.flash('error', err.message)
      res.redirect("/admin/attributes");
    }
  }



  /**
   * @desc   Store attribute details for admin user
   *
   * @param req : request
   * @param res : response
   * @param next
   * @returns {Promise<*>}
   */
  async adminStoreAttribute(req, res, next) {
    try {
      var data = await this.Attributes.adminStoreAttribute(req, res);
      req.flash('success', 'Attribute stored successfully')
      res.redirect("/admin/attributes");
    } catch ( err ) {
      req.flash('error', err.message)
      res.redirect("/admin/attributes");
    }
  }



  /**
   * @desc   Get attribute details & edit form for admin user
   *
   * @param req : request
   * @param res : response
   * @param next
   * @returns {Promise<*>}
   */
  async adminEditAttribute(req, res, next) {
    try {
      var data = await this.Attributes.adminAttributeDetails(req, res);
      let formData = req.locals.formData;
      res.render('admin/attributes/edit', { title: 'Attributes', msg: 'Attribute Edit', data: data, error: false, formData: formData });
    } catch ( err ) {
      req.flash('error', err.message)
      res.redirect("/admin/attributes");
    }
  }



  /**
   * @desc   Get attribute details & edit form for admin user
   *
   * @param req : request
   * @param res : response
   * @param next
   * @returns {Promise<*>}
   */
  async adminUpdateAttribute(req, res, next) {
    try {
      var data = await this.Attributes.adminUpdateAttribute(req, res);
      req.flash('success', 'Attribute updated successfully')
      res.redirect("/admin/attributes");
    } catch ( err ) {
      req.flash('error', err.message)
      res.redirect("/admin/attributes");
    }
  }



  /**
   * @desc   Delete attribute for admin user
   *
   * @param req : request
   * @param res : response
   * @param next
   * @returns {Promise<*>}
   */
  async adminDeleteAttribute(req, res, next) {
    try {
      var data = await this.Attributes.adminDeleteAttribute(req, res);
      req.flash('success', 'Attribute deleted successfully')
      res.redirect("/admin/attributes");
    } catch ( err ) {
      req.flash('error', err.message)
      res.redirect("/admin/attributes");
    }
  }



  /**
   * @desc   Get list of attribute for admin user API
   *
   * @param req : request
   * @param res : response
   * @param next
   * @returns {Promise<*>}
   */
  async adminAttributesListApi(req, res, next) {
    try {
      var datas = await this.Attributes.adminAttributes(req, res);
      if(datas.length) {
        res.status(200).json(this.Response.success(`OK`, { count: datas.length, datas: datas }, res.statusCode));
      } else {
        res.status(500).json(this.Response.error(`Attributes Not found.`, res.statusCode));
      }
    } catch ( err ) {
      res.status(500).json(this.Response.error(err.errors, res.statusCode));
    }
  }



  /**
   * @desc   Get attribute details for admin user
   *
   * @param req : request
   * @param res : response
   * @param next
   * @returns {Promise<*>}
   */
  async adminAttributeDetailsApi(req, res, next) {
    try {
      var data = await this.Attributes.adminAttributeDetails(req, res);
      res.render('admin/attributes/details', { title: 'Attributes', msg: 'Attribute Details', data: data });
    } catch ( err ) {
      req.flash('error', err.message)
      res.redirect("/admin/attributes");
    }
  }
}

module.exports = new AttributesController( );