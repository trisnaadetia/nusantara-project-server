'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Categories', [{
      name: 'Peternakan'
    },{
      name: 'Perikanan'
    },{
      name: 'Konstruksi'
    },{
      name: 'Makanan & minuman'
    },{
      name: 'Jasa'
    },{
      name: 'Other'
    }])
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Categories', null, {})
  }
};
