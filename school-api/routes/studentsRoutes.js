const express = require("express");
const router = express.Router();
const controller = require("../controllers/studentsController");

router.get("/", controller.getAllStudents);
router.get("/:id", controller.getOneStudent);
router.post("/", controller.createStudent);
router.put("/:id", controller.updateStudent);
router.delete("/:id", controller.deleteStudent);

module.exports = router;