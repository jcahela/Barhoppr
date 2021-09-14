const express = require('express');
const asyncHandler = require('express-async-handler');
const { Drink } = require('../../db/models')

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
  const drinks = await Drink.findAll();
  res.json(drinks);
}))


module.exports = router;
