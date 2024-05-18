"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "countries",
        {
          id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING(100),
            unique: true,
            allowNull: false,
          },
          iso3: {
            type: Sequelize.STRING(3),
            unique: true,
            allowNull: false,
          },
          iso2: {
            type: Sequelize.STRING(2),
            unique: true,
            allowNull: false,
          },
          numericCode: {
            type: Sequelize.STRING(5),
            allowNull: false,
          },
          phoneCode: {
            type: Sequelize.STRING(20),
            allowNull: false,
          },
          capital: {
            type: Sequelize.STRING,
            required: true,
          },
          currency: {
            type: Sequelize.STRING(3),
            required: true,
          },
          currencyName: {
            type: Sequelize.STRING(50),
            required: true,
          },
          currencySymbol: {
            type: Sequelize.STRING(10),
            required: true,
          },
          tld: {
            type: Sequelize.STRING(10),
            required: true,
          },
          native: {
            type: Sequelize.STRING,
            required: true,
          },
          regionID: {
            type: Sequelize.BIGINT.UNSIGNED,
            required: true,
            index: true,
            references: {
              model: {
                tableName: "regions",
                modelName: "Region",
              },
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          subRegionID: {
            type: Sequelize.BIGINT.UNSIGNED,
            required: true,
            index: true,
            references: {
              model: {
                tableName: "sub_regions",
                modelName: "SubRegion",
              },
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          nationality: {
            type: Sequelize.STRING(50),
            required: true,
          },
          timezones: {
            type: Sequelize.TEXT,
            required: false,
            allowNull: true,
            defaultValue: null,
          },
          latitude: {
            type: Sequelize.STRING(20),
            required: true,
          },
          longitude: {
            type: Sequelize.STRING(20),
            required: true,
          },
          emoji: {
            type: Sequelize.STRING(10),
            required: true,
          },
          status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
          },
          deletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: null,
          },
          deletedBy: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: true,
            references: {
              model: {
                tableName: "users",
                modelName: "User",
              },
              key: "id",
            },
            onUpdate: "cascade",
            onDelete: "cascade",
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
          createdBy: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: true,
            references: {
              model: {
                tableName: "users",
                modelName: "User",
              },
              key: "id",
            },
            onUpdate: "cascade",
            onDelete: "cascade",
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
          updatedBy: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: true,
            references: {
              model: {
                tableName: "users",
                modelName: "User",
              },
              key: "id",
            },
            onUpdate: "cascade",
            onDelete: "cascade",
          },
        },
        { transaction }
      );
      await queryInterface.addIndex(
        "countries",
        ["name", "iso2", "iso3", "phoneCode", "regionID", "subRegionID"],
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("countries");
  },
};
