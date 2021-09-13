'use strict';
module.exports = (sequelize, DataTypes) => {
  const Drink = sequelize.define('Drink', {
    name: DataTypes.STRING,
    drinkImageUrl: DataTypes.TEXT,
    description: DataTypes.TEXT,
    abv: DataTypes.INTEGER
  }, {});
  Drink.associate = function(models) {
    // associations can be defined here
  };
  return Drink;
};