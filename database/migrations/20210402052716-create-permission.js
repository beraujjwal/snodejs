'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING,
        unique: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      return queryInterface.sequelize.query(`
      CREATE TRIGGER alter_permission_slug_on_delete
        BEFORE UPDATE ON permissions
        FOR EACH ROW
        BEGIN
        IF NEW.deletedAt != null THEN
          SET NEW.slug = CONCAT(OLD.slug, '-', OLD.id);
        END IF;
      END;
      `)
    }).then(() => { console.log('alter_permission_slug_on_delete TRIGGER created') });

  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS alter_permission_slug_on_delete ON permissions`);
    await queryInterface.dropTable('permissions');
  }
};
