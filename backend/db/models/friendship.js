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
    Friendship.belongsTo(models.User, { as: 'Friend1', onDelete: 'CASCADE'})
    Friendship.belongsTo(models.User, { as: 'Friend2', onDelete: 'CASCADE'})
  };
  return Friendship;
};
