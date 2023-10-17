'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('attributes', [
        {'code': 'item_name',             'name': 'Name',                 'type': 'text',       'validation': null,       'position': 1,    'is_required': true,  'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'sku',                   'name': 'SKU',                  'type': 'text',       'validation': null,       'position': 2,    'is_required': true,  'is_unique': true,  'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'url_key',               'name': 'URL Key',              'type': 'text',       'validation': null,       'position': 3,    'is_required': true,  'is_unique': true,  'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'tax_category_id',       'name': 'Tax Category',         'type': 'select',     'validation': null,       'position': 4,    'is_required': false, 'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'category_id',           'name': 'Category',             'type': 'category',   'validation': null,       'position': 5,    'is_required': true,  'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'new',                   'name': 'New',                  'type': 'boolean',    'validation': null,       'position': 6,    'is_required': false, 'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'featured',              'name': 'Featured',             'type': 'boolean',    'validation': null,       'position': 7,    'is_required': false, 'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'visible_individually',  'name': 'Visible Individually', 'type': 'boolean',    'validation': null,       'position': 8,    'is_required': true,  'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'status',                'name': 'Status',               'type': 'boolean',    'validation': null,       'position': 9,    'is_required': true,  'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'color',                 'name': 'Color',                'type': 'select',     'validation': null,       'position': 10,   'is_required': false, 'is_unique': false, 'is_filterable': true,  'is_configurable': true,  'is_user_defined': true,  'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'size',                  'name': 'Size',                 'type': 'select',     'validation': null,       'position': 11,   'is_required': false, 'is_unique': false, 'is_filterable': true,  'is_configurable': true,  'is_user_defined': true,  'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'brand',                 'name': 'Brand',                'type': 'select',     'validation': null,       'position': 12,   'is_required': false, 'is_unique': false, 'is_filterable': true,  'is_configurable': false, 'is_user_defined': false, 'is_visible': true,  'status':true, 'created_by':1,'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'short_description',     'name': 'Short Description',    'type': 'textarea',   'validation': null,       'position': 1,    'is_required': true,  'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'description',           'name': 'Description',          'type': 'textarea',   'validation': null,       'position': 2,    'is_required': true,  'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'main_image',            'name': 'Main Image',           'type': 'image',      'validation': null,       'position': 1,    'is_required': false, 'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'feature_image',         'name': 'Feature Image',        'type': 'image',      'validation': null,       'position': 2,    'is_required': false, 'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'gallery_images',        'name': 'Gallery Images',       'type': 'images',     'validation': null,       'position': 3,    'is_required': false, 'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'offer_image',           'name': 'Offer Image',          'type': 'image',      'validation': null,       'position': 4,    'is_required': false, 'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'price',                 'name': 'Price',                'type': 'price',      'validation': 'decimal',  'position': 1,    'is_required': true,  'is_unique': false, 'is_filterable': true,  'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'cost',                  'name': 'Cost',                 'type': 'price',      'validation': 'decimal',  'position': 2,    'is_required': false, 'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': true,  'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'special_price',         'name': 'Special Price',        'type': 'price',      'validation': 'decimal',  'position': 3,    'is_required': false, 'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'special_price_from',    'name': 'Special Price From',   'type': 'date',       'validation': null,       'position': 4,    'is_required': false, 'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'special_price_to',      'name': 'Special Price To',     'type': 'date',       'validation': null,       'position': 5,    'is_required': false, 'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'meta_title',            'name': 'Meta Title',           'type': 'textarea',   'validation': null,       'position': 1,    'is_required': false, 'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'meta_keywords',         'name': 'Meta Keywords',        'type': 'textarea',   'validation': null,       'position': 2,    'is_required': false, 'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'meta_description',      'name': 'Meta Description',     'type': 'textarea',   'validation': null,       'position': 3,    'is_required': false, 'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': true,  'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'width',                 'name': 'Width',                'type': 'text',       'validation': 'decimal',  'position': 1,    'is_required': false, 'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': true,  'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'height',                'name': 'Height',               'type': 'text',       'validation': 'decimal',  'position': 2,    'is_required': false, 'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': true,  'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'depth',                 'name': 'Depth',                'type': 'text',       'validation': 'decimal',  'position': 3,    'is_required': false, 'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': true,  'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()},
        {'code': 'weight',                'name': 'Weight',               'type': 'text',       'validation': 'decimal',  'position': 4,    'is_required': true,  'is_unique': false, 'is_filterable': false, 'is_configurable': false, 'is_user_defined': false, 'is_visible': false, 'status':true, 'created_by':1, 'created_at': new Date(), 'updated_at': new Date()}
      ], 
    {});
    
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('roles', null, {});
     */
     await queryInterface.bulkDelete('attributes', null, {});
  }
};
