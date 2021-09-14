'use strict';

function getAbv(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumStr = (Math.floor(Math.random() * (max - min) + min) / 10).toFixed(1); 
  return Number(randomNumStr);
}

function getAbvBeerWine() {
  return getAbv(30, 160);
}

function getAbvLiquor() {
  return getAbv(280, 600);
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Drinks', [
      {
        name: 'Heineken Lager Beer',
        drinkImageUrl: 'https://cdn.discordapp.com/attachments/886336420552269847/887161620223131718/heineken-1.png',
        description: "Heineken is a super-inoffensive lager with a stronger, bitterer taste than most internationally mass-produced lagers. It's perfectly carbonated, pours a straw yellow colour, with little or no head to speak of. It goes down smoothly when it's ice cold.",
        abv: getAbvBeerWine()
      },
      {
        name: '2017 Erath Oregon Pinot Noir',
        drinkImageUrl: 'https://cdn.discordapp.com/attachments/886336420552269847/887180978345349170/fkzexbrchwummcunqzq3.png',
        description: "The 2017 Erath Pinot Noir begins with strong and pleasing aromas of red cherry, licorice, mint and a bit of a woodsy/earthy note.",
        abv: getAbvBeerWine()
      },
      {
        name: 'Coors Light',
        drinkImageUrl: 'https://cdn.discordapp.com/attachments/886336420552269847/887171911866531900/COORS20MAIN20LOGO_2.png',
        description: "Full of Rocky Mountain refreshment, this light-calorie beer provides a light body with clean malt notes and low bitterness.",
        abv: getAbvBeerWine()
      },
      {
        name: 'Jack Daniels Tennessee Whiskey',
        drinkImageUrl: 'https://cdn.discordapp.com/attachments/886336420552269847/887182055266471986/1200px-Jack_Daniels_Logo.png',
        description: "Light with plenty of sweetness. There are hints of dry spice and oily nuts, a touch of smoke.",
        abv: getAbvLiquor()
      },
      {
        name: 'Jameson',
        drinkImageUrl: 'https://cdn.discordapp.com/attachments/886336420552269847/887173938159964170/Jameson-Emblem.png',
        description: "Full of Rocky Mountain refreshment, this light-calorie beer provides a light body with clean malt notes and low bitterness.",
        abv: getAbvLiquor()
      },
      {
        name: 'Hakkaisan Tokubetsu Junmai',
        drinkImageUrl: 'https://cdn.discordapp.com/attachments/886336420552269847/887184081417302016/Hakkaisan-Logo-Black-300x296.png',
        description: "A flavor of almond and vanilla with a hint of a lactic character melts across the palate like a snowflake caught on the tongue.",
        abv: getAbvLiquor()
      },
      {
        name: 'Smirnoff Ice',
        drinkImageUrl: 'https://cdn.discordapp.com/attachments/886336420552269847/887184597627052093/Smirnoff-Ice-logo-1.png',
        description: "With its crisp taste and bubbly finish, Smirnoff Ice Original features natural lemon lime flavor. Lightly carbonated, Smirnoff Ice has a delicious citrus bite, along with a refreshing effervescence.",
        abv: getAbvBeerWine()
      },
      {
        name: 'Longboard Island Lager',
        drinkImageUrl: 'https://cdn.discordapp.com/attachments/886336420552269847/887185130563710976/beer-13560_4b48e_hd.png',
        description: "Ride a wave of crisp refreshment with Longboard. It goes down smooth like the surf break at iconic Waikiki Beach - so chill, you’ll want to come back again and again. Paradies is just a sip away, so relax with your ohana and celebrate what makes life good. One life, right?",
        abv: getAbvBeerWine()
      },
      {
        name: 'Kona Light Blonde Ale',
        drinkImageUrl: 'https://cdn.discordapp.com/attachments/886336420552269847/887185515248504882/beer-3527365_8c8a2_hd.png',
        description: "Sit back and relax, with a crisp, 99-calorie Kona Light in hand. It’s as refreshing as that golden island moment then the day is winding down, the sun’s still warm, and friends gather near rocky Kailua Pier. Paradise is just a sip away, so soak in a day well-lived. ",
        abv: getAbvBeerWine()
      },
      {
        name: 'Sonoma-Cutrer Rosé of Pinot Noir',
        drinkImageUrl: 'https://cdn.discordapp.com/attachments/886336420552269847/887186640534118430/vaau0wo9obqdiofuwnwq.png',
        description: "Sit back and relax, with a crisp, 99-calorie Kona Light in hand. It’s as refreshing as that golden island moment then the day is winding down, the sun’s still warm, and friends gather near rocky Kailua Pier. Paradise is just a sip away, so soak in a day well-lived. ",
        abv: getAbvBeerWine()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Drinks', null, {});
  }
};
