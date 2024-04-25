'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const data = require('../stocks.json')
    .map((e)=>{
      e.createdAt = e.updatedAt=new Date()
      return e;
    })
    await queryInterface.bulkInsert('Stocks',data);
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Stocks', null, {
      truncate: true,
      restartIdentity:true
    });
  }
};
