const express = require("express");
const router = express.Router();

const controller = require("../controllers/studentsController");
const verifyToken = require("../middleware/auth");

// PUBLIC
router.get("/", controller.getAllStudents);
router.get("/:id", controller.getOneStudent);

// PROTECTED 🔒
router.post("/", verifyToken, controller.createStudent);
router.put("/:id", verifyToken, controller.updateStudent);
router.delete("/:id", verifyToken, controller.deleteStudent);

module.exports = router;