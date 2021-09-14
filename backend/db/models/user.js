'use strict';
const bcrypt = require('bcryptjs');

const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100]
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100]
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
    profilePicture: {
      type: DataTypes.STRING
    }
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Checkin, { foreignKey: 'userId' });

    const columnMapping1 = {
      as: 'Friend1',
      through: 'Friendship',
      otherKey: 'user2',
      foreignKey: 'user1'
    }

    const columnMapping2 = {
      as: 'Friend2',
      through: 'Friendship',
      otherKey: 'user1',
      foreignKey: 'user2'
    }

    User.belongsToMany(models.User, columnMapping1);
    User.belongsToMany(models.User, columnMapping2);
  };
  User.prototype.toSafeObject = function() {
    const { id, username, email, firstname, lastname, profilePicture } = this;
    return { id, username, email, firstname, lastname, profilePicture };
  };
  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };
  User.getCurrentUserById = async function(id) {
    return await User.scope('currentUser').findByPk(id);
  };
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });

    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };
  User.signup = async function ({ username, email, password, profilePicture, firstname, lastname }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      firstname,
      lastname,
      username,
      email,
      hashedPassword,
      profilePicture
    });
    return await User.scope('currentUser').findByPk(user.id);
  }

  return User;
};
