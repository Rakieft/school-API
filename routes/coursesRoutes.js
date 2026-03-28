const express = require("express");
const router = express.Router();

const controller = require("../controllers/coursesController");
const verifyToken = require("../middleware/auth");

// PUBLIC
router.get("/", controller.getAllCourses);
router.get("/:id", controller.getOneCourse);

// PROTECTED 🔒
router.post("/", verifyToken, controller.createCourse);
router.put("/:id", verifyToken, controller.updateCourse);
router.delete("/:id", verifyToken, controller.deleteCourse);

module.exports = router;