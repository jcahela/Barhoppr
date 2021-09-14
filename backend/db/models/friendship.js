'use strict';
module.exports = (sequelize, DataTypes) => {
  const Friendship = sequelize.define('Friendship', {
    user1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user2: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Friendship.associate = function(models) {
    // associations can be defined here
  };
  return Friendship;
};
