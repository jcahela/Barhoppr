'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Friendships', [
      {
        user1: 1,
        user2: 2
      },
      {
        user1: 1,
        user2: 3
      },
      {
        user1: 1,
        user2: 4
      },
      {
        user1: 1,
        user2: 5
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Friendships', null, {});
  }
};
