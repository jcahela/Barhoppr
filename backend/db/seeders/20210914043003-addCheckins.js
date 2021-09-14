'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Checkins', [
      {
        userId: 1,
        drinkId: 1,
        servingStyle: "bottle",
        rating: 4.7,
        comment: "I found this to be a fantastic beer. It was great. I loved so much of what it was, what it became, and what it can be in the future, so much potential, love beer, beer beer beer. Lots of text to see what it looks like on the page? Sure why not!"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Checkins', null, {});
  }
};
