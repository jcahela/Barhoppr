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
      allowNull: false,
      validate: {
        min: 0,
        max: 5
      }
    },
    comment: {
      type: DataTypes.TEXT
    }
  }, {});
  Checkin.associate = function(models) {
    Checkin.belongsTo(models.User, { foreignKey: 'userId' });
    Checkin.belongsTo(models.Drink, { foreignKey: 'drinkId' });
  };
  return Checkin;
};
