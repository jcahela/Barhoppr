'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs')

const users = [];

const profilePictures = [
  'https://randomuser.me/api/portraits/med/men/13.jpg',
  'https://randomuser.me/api/portraits/med/men/90.jpg',
  'https://randomuser.me/api/portraits/med/women/38.jpg',
  'https://randomuser.me/api/portraits/med/women/69.jpg',
  'https://randomuser.me/api/portraits/med/women/45.jpg',
  'https://randomuser.me/api/portraits/med/men/49.jpg',
  'https://randomuser.me/api/portraits/med/women/36.jpg',
  'https://randomuser.me/api/portraits/med/men/53.jpg',
  'https://randomuser.me/api/portraits/med/women/2.jpg',
  'https://randomuser.me/api/portraits/med/women/46.jpg',
  'https://randomuser.me/api/portraits/med/women/42.jpg',
  'https://randomuser.me/api/portraits/med/men/42.jpg',
  'https://randomuser.me/api/portraits/med/men/72.jpg',
  'https://randomuser.me/api/portraits/med/men/88.jpg',
  'https://randomuser.me/api/portraits/med/women/92.jpg',
  'https://randomuser.me/api/portraits/med/men/98.jpg',
  'https://randomuser.me/api/portraits/med/men/79.jpg',
  'https://randomuser.me/api/portraits/med/women/63.jpg',
  'https://randomuser.me/api/portraits/med/women/47.jpg',
  'https://randomuser.me/api/portraits/med/women/76.jpg',
]

function createUsers(num) {
  for (let i = 0; i < num; i++) {
    const user = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
      profilePicture: profilePictures[i],
      createdAt: faker.date.between('2015-01-01', '2021-08-31')
    };

    users.push(user);
  }
}

createUsers(20);

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-guy',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicture: 'https://randomuser.me/api/portraits/med/men/4.jpg',
        createdAt: faker.date.between('2015-01-01', '2021-08-31')
      },
      ...users
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
