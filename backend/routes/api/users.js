const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth');
const { User, Checkin } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3')

const router = express.Router();

const validateSignupExists = [
  check('firstname')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a first name'),
  check('lastname')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a last name'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a username'),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please enter an email'),
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

router.post('/', 
  validateSignupExists, 
  validateSignup, 
  asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password, username } = req.body;
    const user = await User.signup({ 
      email, 
      username, 
      password, 
      firstname, 
      lastname 
    });

    await setTokenCookie(res, user);

    return res.json({user});
}));

router.patch('/:id/update-profile-pic', 
  singleMulterUpload("image"),
  asyncHandler(async (req, res, next) => {
    const userId = req.params.id;
    let profilePicture;
    if (req.file) profilePicture = await singlePublicFileUpload(req.file);
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      const err = new Error('Profile image update failed');
      err.status = 401;
      err.title = 'Profile Pic Update Failed';
      err.errors = ['The user does not exist.'];
      return next(err);
    }

    await userToUpdate.update({
      profilePicture
    });

    res.json(userToUpdate);
}))

module.exports = router;
