'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(30),
        unique: true
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(256),
        unique: true
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      hashedPassword: {
        allowNull: false,
        type: Sequelize.STRING(60),
      },
      profilePicture: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(
      'Users', 
      null, 
      { truncate: true, cascade: true, restartIdentity: true }
    );
  }
};
