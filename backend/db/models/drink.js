'use strict';
module.exports = (sequelize, DataTypes) => {
  const Drink = sequelize.define('Drink', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 100]
      },
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
        max: 100
      },
    }
  }, {});
  Drink.associate = function(models) {
    // associations can be defined here
  };
  return Drink;
};
