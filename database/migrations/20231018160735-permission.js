'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('permissions', {
      id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
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
    }).then(() => queryInterface.addIndex('permissions', ['name', 'slug']));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS alter_permission_slug_on_delete`);
    await queryInterface.dropTable('permissions');
  }
};
