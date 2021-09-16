const express = require('express');
const asyncHandler = require('express-async-handler');
const { Drink, Checkin } = require('../../db/models')

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
  const drinks = await Drink.findAll({
    include: Checkin
  });
  res.json(drinks);
}));

router.get('/top-5', asyncHandler(async (req, res) => {
  const drinks = await Drink.findAll({
    include: Checkin
  });

  const drinksArr = [...drinks];

  drinksArr.forEach(drink => {
    const ratingsArr = [];
    drink.Checkins.forEach(checkin => ratingsArr.push(Number(checkin.rating)));
    let avgRating;
    if (ratingsArr.length > 0) {
      avgRating = (ratingsArr.reduce((a, b) => (a + b)) / ratingsArr.length).toFixed(2);
    } else {
      avgRating = 0;
    }
    drink['avgRating'] = avgRating;
  })

  drinksArr.sort((a, b) => (a.avgRating < b.avgRating ? 1 : -1));

  const topFive = drinksArr.slice(0, 5);

  res.json(topFive);
}))


module.exports = router;
