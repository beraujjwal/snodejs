'use strict';
require('dotenv').config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dbName = process.env.DB_CONNECTION;
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('permissions', {
        id: {
          type: Sequelize.BIGINT,
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
        deletedBy: {
          type: Sequelize.BIGINT,
          allowNull: true,
          references: {
            model: {
              tableName: 'users',
              modelName: 'User'
            },
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        createdBy: {
          type: Sequelize.BIGINT,
          allowNull: true,
          references: {
            model: {
              tableName: 'users',
              modelName: 'User'
            },
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        updatedBy: {
          type: Sequelize.BIGINT,
          allowNull: true,
          references: {
            model: {
              tableName: 'users',
              modelName: 'User'
            },
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
      }, { transaction });
      if(dbName === 'mysql') {
        await queryInterface.sequelize.query(`
        CREATE TRIGGER alter_permission_slug_on_delete
          BEFORE UPDATE ON permissions
          FOR EACH ROW
            BEGIN
              IF NEW.deletedAt != null THEN
                SET NEW.slug = CONCAT(OLD.slug, '-', OLD.id);
              END IF;
        END;`, { transaction });
      }

      await queryInterface.addIndex('permissions', ['name', 'slug'], { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS alter_permission_slug_on_delete`);
      await queryInterface.dropTable('permissions');
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
