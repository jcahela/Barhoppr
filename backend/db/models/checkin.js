'use strict';
module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define('Checkin', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    drinkId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    servingStyle: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT
    }
  }, {});
  Checkin.associate = function(models) {
    // associations can be defined here
  };
  return Checkin;
};
