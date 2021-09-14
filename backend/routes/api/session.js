const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Checkin, Drink, Friendship } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')

const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];

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
router.get('/user', asyncHandler(async (req, res) => {
  // get the first user and all friends of that user
  const demoUser = await User.findByPk(1, {
    include: 'Friend2'
  });
  res.json(demoUser);
}))

router.post('/', validateLogin, asyncHandler(async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });
  if (!user) {
    const err = new Error('Login Failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['The provided credentials were invalid.'];
    return next(err);
  }

  await setTokenCookie(res, user);

  return res.json({ user })
}));

router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' })
});



module.exports = router;
