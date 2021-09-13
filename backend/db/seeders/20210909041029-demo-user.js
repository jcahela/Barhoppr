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

function createUsers() {
  for (let i = 0; i < profilePictures.length; i++) {
    const user = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
      profilePicture: profilePictures[i],
      createdAt: faker.date.between('2015-01-01', '2021-08-31')
    };

    users.push(user);
  }
}

createUsers();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'demo-guy',
        firstname: 'Andy',
        lastname: 'Samberg',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicture: 'https://randomuser.me/api/portraits/med/men/4.jpg',
        createdAt: faker.date.between('2015-01-01', '2021-08-31')
      },
      ...users
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
