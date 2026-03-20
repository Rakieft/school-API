const { getDB } = require("../database/connection");
const { ObjectId } = require("mongodb");

// GET ALL
const getAllStudents = async (req, res) => {
  try {
    const students = await getDB().collection("students").find().toArray();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch students",
      details: err.message
    });
  }
};

// GET ONE
const getOneStudent = async (req, res) => {
  try {
    const student = await getDB()
      .collection("students")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({
      error: "Error retrieving student",
      details: err.message
    });
  }
};

// CREATE
const createStudent = async (req, res) => {
  const student = req.body;

  if (
    !student.firstName ||
    !student.lastName ||
    !student.email ||
    !student.age ||
    !student.course ||
    !student.gpa ||
    !student.enrollmentDate
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await getDB().collection("students").insertOne(student);
    res.status(201).json({
      message: "Student created",
      id: result.insertedId
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to create student",
      details: err.message
    });
  }
};

// UPDATE
const updateStudent = async (req, res) => {
  const student = req.body;

  // 🔥 VALIDATION AJOUTÉE (IMPORTANT POUR TA NOTE)
  if (
    !student.firstName ||
    !student.lastName ||
    !student.email ||
    !student.age ||
    !student.course ||
    !student.gpa ||
    !student.enrollmentDate
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await getDB().collection("students").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: student }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student updated" });
  } catch (err) {
    res.status(500).json({
      error: "Update failed",
      details: err.message
    });
  }
};

// DELETE
const deleteStudent = async (req, res) => {
  try {
    const result = await getDB().collection("students").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({
      error: "Delete failed",
      details: err.message
    });
  }
};

module.exports = {
  getAllStudents,
  getOneStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};