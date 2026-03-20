const { getDB } = require("../database/connection");
const { ObjectId } = require("mongodb");

// GET ALL
const getAllCourses = async (req, res) => {
  try {
    const courses = await getDB().collection("courses").find().toArray();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

// GET ONE
const getOneCourse = async (req, res) => {
  try {
    const course = await getDB()
      .collection("courses")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!course) return res.status(404).json({ error: "Course not found" });

    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving course" });
  }
};

// CREATE
const createCourse = async (req, res) => {
  const course = req.body;

  if (
    !course.title ||
    !course.code ||
    !course.teacher ||
    !course.credits ||
    !course.schedule ||
    !course.room
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await getDB().collection("courses").insertOne(course);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to create course" });
  }
};

// UPDATE
const updateCourse = async (req, res) => {
  try {
    const result = await getDB().collection("courses").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0)
      return res.status(404).json({ error: "Course not found" });

    res.json({ message: "Course updated" });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

// DELETE
const deleteCourse = async (req, res) => {
  try {
    const result = await getDB().collection("courses").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Course not found" });

    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};

module.exports = {
  getAllCourses,
  getOneCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};