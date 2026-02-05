const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const duenoController = require("../../controllers/duenoController");
const {authenticateToken}= require("../../middleware/auth");
// Example routes
router.get("/users",authenticateToken, userController.getAllUsers);

router.get("/duenos",authenticateToken, duenoController.getAllDuenos);
router.post("/duenos",authenticateToken, duenoController.saveDueno);
router.patch("/duenos/:id",authenticateToken, duenoController.updateDueno);
router.delete("/duenos/:id",authenticateToken, duenoController.deleteDueno);

module.exports = router;