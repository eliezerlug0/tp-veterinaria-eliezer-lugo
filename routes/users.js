const express = require('express');
const router = express.Router();
//const userController = require('../../../controllers/user.controller');
//const { validate } = require('../../../middleware/validation.middleware');
//const { auth } = require('../../../middleware/auth.middleware');
//const userValidators = require('../../../utils/validators/user.validators');

// Ruta pública
//router.get('/public', userController.getPublicUsers);

// Rutas protegidas por autenticación
//router.use(auth);

// GET /api/v1/users
router.get('/', userController.getAllUsers);

// GET /api/v1/users/:id
/*  
router.get(
  '/:id',
  validate(userValidators.getUserById),
  userController.getUserById
);

// POST /api/v1/users

router.post(
  '/',
  validate(userValidators.createUser),
  userController.createUser
);

// PUT /api/v1/users/:id
router.put(
  '/:id',
  validate(userValidators.updateUser),
  userController.updateUser
);

// DELETE /api/v1/users/:id
router.delete(
  '/:id',
  validate(userValidators.deleteUser),
  userController.deleteUser
);
*/
module.exports = router;