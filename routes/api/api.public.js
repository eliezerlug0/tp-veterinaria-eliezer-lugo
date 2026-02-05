const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

// Example routes
router.post("/register", userController.getAsRegister);
//router.get("/examples/:id", exampleController.getById);
router.post("/login", userController.getAsLogin);
//router.put("/examples/:id", exampleController.update);
//router.delete("/examples/:id", exampleController.delete);

module.exports = router;