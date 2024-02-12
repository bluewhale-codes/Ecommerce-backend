const { body, validationResult } = require('express-validator');

// export const createValidator = [
//     body('name', 'username does not Empty').not().isEmpty(),
//     body('owner', 'Invalid email').isEmail(),
//     body('user.age', 'username must be Alphanumeric').isAlphanumeric(),
//     body('user.birthday', 'Invalid birthday').isISO8601(), // check date is ISOString
//     body('user.password', 'password does not Empty').not().isEmpty(),
//     body('user.password', 'The minimum password length is 6 characters').isLength({min: 6}),
//   ]
export const createValidator = [
    body('name', 'The minimum password length is 4 characters').isLength({min: 4}).withMessage('must be at least 4 chars long'),
  ]