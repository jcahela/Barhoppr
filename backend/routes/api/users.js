const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth');
const { User, Checkin } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')

const router = express.Router();

const validateSignupExists = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please enter an email'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a username'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a password'),
    handleValidationErrors
];

const validateSignup = [
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
]

router.get('/emails', asyncHandler(async (req, res) => {
  const emails = await User.findAll({
    attributes: ['email']
  });
  res.json(emails);
}))

router.get('/usernames', asyncHandler(async (req, res) => {
  const usernames = await User.findAll({
    attributes: ['username']
  });
  res.json(usernames);
}))

router.get('/all', asyncHandler(async (req, res) => {
  const users = await User.findAll({
    include: Checkin
  });
  res.json(users);
}))

router.post('/', validateSignupExists, validateSignup, asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password, username, profilePicture } = req.body;
  const user = await User.signup({ email, username, password, profilePicture, firstname, lastname });

  await setTokenCookie(res, user);

  return res.json({user});
}))

module.exports = router;
