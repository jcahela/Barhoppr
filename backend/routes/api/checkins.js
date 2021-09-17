const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { Checkin, User, Drink } = require('../../db/models')
const { restoreUser } = require('../../utils/auth');

const router = express.Router();

router.use(restoreUser);

// Test User/Drink/Checkin models
// router.get('/user', asyncHandler(async (req, res) => {
//   // get the first drink Id, then get all checkins of that drink, and all users that have made checkins on that drink
//   const demoUser = await Drink.findByPk(1, {
//     include: {
//       model: Checkin,
//       include: User
//     }
//   });
//   res.json(demoUser);
// }))

// Test Friendship model
// router.get('/user', asyncHandler(async (req, res) => {
//   // get the first user and all friends of that user
//   const demoUser = await User.findByPk(1, {
//     include: ['Friend1', 'Friend2']
//   });
//   res.json(demoUser);
// }));

router.get('/', asyncHandler(async (req, res) => {
  const { user } = req;
  if (user) {
    const currentUserCheckins = await Checkin.findAll({
      where: {userId: user.id},
      include: [User, Drink]
    })
    res.json(currentUserCheckins)
  } else {
    res.json({});
  }
}));

router.get('/all', asyncHandler(async (req, res) => {
  const allCheckins = await Checkin.findAll({
    include: [User, Drink],
    order: [['createdAt', 'DESC']]
  });
  res.json(allCheckins);
}));

const validateCheckin = [
  check('drinkId')
    .exists({ checkFalsy: true })
    .withMessage('You must provide a drinkId'),
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

router.delete('/', asyncHandler(async (req, res) => {
  const { checkinId } = req.body;

  const checkinToDestroy = await Checkin.findByPk(checkinId);

  await checkinToDestroy.destroy();

  res.json({checkinToDestroy});
}))

router.put('/:id(\\d+)', validateCheckin, asyncHandler(async (req, res) => {
  const { drinkId, servingStyle, rating, comment } = req.body;
  const checkinId = req.params.id;

  const checkinToEdit = await Checkin.findByPk(checkinId);
  await checkinToEdit.update({
    drinkId, 
    servingStyle, 
    rating, 
    comment
  });
  
  
  res.json(checkinToEdit);
}))


module.exports = router;
