const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { Checkin, User } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.use(requireAuth);

router.get('/', asyncHandler(async (req, res) => {
  const { user } = req;
  const currentUserCheckins = await Checkin.findAll({
    where: {userId: user.id}
  })
  res.json(currentUserCheckins)
}))

const validateCheckin = [
  check('drinkId')
    .exists({ checkFalsy: true }),
  check('rating')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a rating.')
    .isFloat({
      min: 0,
      max: 5
    })
    .withMessage('Your rating must be between 0 and 5.'),
    handleValidationErrors
]

router.post('/', validateCheckin, asyncHandler(async (req, res) => {
  const { user } = req;
  const { drinkId, servingStyle, rating, comment } = req.body;

  const checkin = await Checkin.create({
    userId: user.id,
    drinkId, 
    servingStyle, 
    rating, 
    comment
  });

  if (!checkin) {
    const err = new Error('Checkin Failed');
    err.status = 401;
    err.title = 'Checkin failed';
    err.errors = ['Something went wrong and the checkin failed.'];
  }

  res.json(checkin);

}))



module.exports = router;
