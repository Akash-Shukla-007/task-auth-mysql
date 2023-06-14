const express = require("express");

const AuthMiddleware = require("../Middleware/AuthMiddleware");
const home = require("../Controllers/Taskcontroller");

const router = express.Router();

router.get("/default", AuthMiddleware, home.home);
router.post("/add-task", AuthMiddleware, home.AddTask);
router.put("/edit-task", AuthMiddleware, home.EditTask);
router.post("/delete-task", AuthMiddleware, home.DeleteTask);

module.exports = router;
