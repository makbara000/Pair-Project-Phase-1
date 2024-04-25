'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserStocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      StockId: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'Stocks',
            key:'id',
          },
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      UserId: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'Users',
            key:'id',
          },
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      totalInvestment: {
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserStocks');
  }
};