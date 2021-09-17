const express = require('express');
const asyncHandler = require('express-async-handler');
const { Drink, Checkin } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');


const router = express.Router();

const validateDrink = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a drink name'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a description'),
  check('abv')
    .exists({ checkFalsy: true })
    .withMessage('Please enter an ABV%')
    .isFloat({
      min: 0,
      max: 70
    })
    .withMessage('ABV% must be between 0 and 70'),
  handleValidationErrors
]

router.get('/', asyncHandler(async(req, res) => {
  const drinks = await Drink.findAll({
    include: Checkin,
    order: [['createdAt', 'DESC']]
  });
  res.json(drinks);
}));

router.post('/',
  validateDrink,
  singleMulterUpload("image"), 
  asyncHandler(async (req, res) => {
  const { name, description, abv } = req.body;
  const drinkImageFile = await singlePublicFileUpload(req.file);

  const newDrink = Drink.create({
    name, 
    drinkImageUrl: drinkImageFile, 
    description, 
    abv
  });

  res.json(newDrink);
}))

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
