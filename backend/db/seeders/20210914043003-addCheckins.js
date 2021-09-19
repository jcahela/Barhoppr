'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Checkins', [
      {
        userId: 1,
        drinkId: 7,
        servingStyle: "bottle",
        rating: 4.7,
        comment: "I found this to be a fantastic beer. It was great. I loved so much of what it was, what it became, and what it can be in the future, so much potential, love beer, beer beer beer. Lots of text to see what it looks like on the page? Sure why not!",
        createdAt: faker.date.between('2015-01-01', '2021-06-30'),
        updatedAt: faker.date.between('2021-07-01', '2021-09-19')
      },
      {
        userId: 1,
        drinkId: 3,
        servingStyle: "glass",
        rating: 4.2,
        comment: "This was a great drink, the wine made me think of the old country, the roaming lands of green back in Italy, the legs of the wine was leggy with legginess. Would totally drink this again while sitting in a classy winery.",
        createdAt: faker.date.between('2015-01-01', '2021-06-30'),
        updatedAt: faker.date.between('2021-07-01', '2021-09-19')
      },
      {
        userId: 2,
        drinkId: 1,
        servingStyle: "draft",
        rating: 4.8,
        comment: "This was a great beer, who know there was a brewery that made such amazing beers in Hawaii! It made me want to sit back and relax at the beach, but also get drunk while doing so.",
        createdAt: faker.date.between('2015-01-01', '2021-06-30'),
        updatedAt: faker.date.between('2021-07-01', '2021-09-19')
      },
      {
        userId: 2,
        drinkId: 4,
        servingStyle: "bottle",
        rating: 4.2,
        comment: "Yet another addition to the favorite beer club. This one had a more earthy feel to it, but was a bit more bitter than the other one. I think it's fantastic though because it's great quality!",
        createdAt: faker.date.between('2015-01-01', '2021-06-30'),
        updatedAt: faker.date.between('2021-07-01', '2021-09-19')
      },
      {
        userId: 3,
        drinkId: 6,
        servingStyle: "glass",
        rating: 4.5,
        comment: "Nothing like a classy glass Jack Daniels to make a night go great. This was a smooth taste, had the oak flavor and was a delight.",
        createdAt: faker.date.between('2015-01-01', '2021-06-30'),
        updatedAt: faker.date.between('2021-07-01', '2021-09-19')
      },
      {
        userId: 3,
        drinkId: 10,
        servingStyle: "glass",
        rating: 4.2,
        comment: "Jameson is such a smooth drink it actually tastes great! It has a lightness to it that goes great with a coke!",
        createdAt: faker.date.between('2015-01-01', '2021-06-30'),
        updatedAt: faker.date.between('2021-07-01', '2021-09-19')
      },
      {
        userId: 8,
        drinkId: 2,
        servingStyle: "glass",
        rating: 3.2,
        comment: "Love a good Pinot, but this one was a bit bitter and left me with a bad hangover. I don't think they took the time to make it a quality drink. But it was pretty cheap!",
        createdAt: faker.date.between('2015-01-01', '2021-06-30'),
        updatedAt: faker.date.between('2021-07-01', '2021-09-19')
      },
      {
        userId: 4,
        drinkId: 9,
        servingStyle: "can",
        rating: 4.7,
        comment: "Drank this while watching the football game on TV. There are some moments in life where you're in your own house, enjoying a beer, watching something entertaining, with your family around you. Thank you Coors!",
        createdAt: faker.date.between('2015-01-01', '2021-06-30'),
        updatedAt: faker.date.between('2021-07-01', '2021-09-19')
      },
      {
        userId: 5,
        drinkId: 2,
        servingStyle: "bottle",
        rating: 4.6,
        comment: "I love a good sake but Hakkaisan Tokubetsu Junmai takes the cake. It's smooth, it tastes great, and it was such a nice looking bottle too!",
        createdAt: faker.date.between('2015-01-01', '2021-06-30'),
        updatedAt: faker.date.between('2021-07-01', '2021-09-19')
      },
      {
        userId: 5,
        drinkId: 5,
        servingStyle: "can",
        rating: 3.9,
        comment: "Smirnoff Ice is great, when you're not trying to look all that classy but still want to have a good time with friends, this one tasted like blueberries and had an interesting bubbly finish to it.",
        createdAt: faker.date.between('2015-01-01', '2021-06-30'),
        updatedAt: faker.date.between('2021-07-01', '2021-09-19')
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Checkins', null, {});
  }
};
