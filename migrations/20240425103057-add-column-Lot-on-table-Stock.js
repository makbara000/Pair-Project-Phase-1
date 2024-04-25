'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('Stocks', 'Lot', { 
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 100
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Stocks', 'Lot')
  }
};
