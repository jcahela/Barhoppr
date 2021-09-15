const express = require('express');
const asyncHandler = require('express-async-handler');
const { Drink, Checkin } = require('../../db/models')

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
  const drinks = await Drink.findAll({
    include: Checkin
  });
  res.json(drinks);
}))


module.exports = router;
