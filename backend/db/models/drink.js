'use strict';
module.exports = (sequelize, DataTypes) => {
  const Drink = sequelize.define('Drink', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    drinkImageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    abv: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      unique: true,
      validate: {
        min: 0,
        max: 70
      },
    }
  }, {});
  Drink.associate = function(models) {
    Drink.hasMany(models.Checkin, { foreignKey: 'drinkId' });
  };
  return Drink;
};
