'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "UserDetailId", {
      allowNull: false,
      type: Sequelize.INTEGER,
      references:{
        model:{
          tableName: "UserDetails",
          key: "id"
        }
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users","UserDetailId")
  }
};
