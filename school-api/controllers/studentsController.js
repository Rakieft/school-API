const { getDB } = require("../database/connection");
const { ObjectId } = require("mongodb");

// GET ALL
const getAllStudents = async (req, res) => {
  try {
    const students = await getDB().collection("students").find().toArray();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

// GET ONE
const getOneStudent = async (req, res) => {
  try {
    const student = await getDB()
      .collection("students")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!student) return res.status(404).json({ error: "Student not found" });

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving student" });
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
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to create student" });
  }
};

// UPDATE
const updateStudent = async (req, res) => {
  try {
    const result = await getDB().collection("students").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0)
      return res.status(404).json({ error: "Student not found" });

    res.json({ message: "Student updated" });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

// DELETE
const deleteStudent = async (req, res) => {
  try {
    const result = await getDB().collection("students").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Student not found" });

    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};

module.exports = {
  getAllStudents,
  getOneStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};