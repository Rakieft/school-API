const { getDB } = require("../database/connection");
const { ObjectId } = require("mongodb");

// GET ALL
const getAllCourses = async (req, res) => {
  try {
    const courses = await getDB().collection("courses").find().toArray();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch courses",
      details: err.message
    });
  }
};

// GET ONE
const getOneCourse = async (req, res) => {
  try {
    const course = await getDB()
      .collection("courses")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({
      error: "Error retrieving course",
      details: err.message
    });
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
    res.status(201).json({
      message: "Course created",
      id: result.insertedId
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to create course",
      details: err.message
    });
  }
};

// UPDATE
const updateCourse = async (req, res) => {
  const course = req.body;

  // 🔥 VALIDATION AJOUTÉE
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
    const result = await getDB().collection("courses").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: course }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ message: "Course updated" });
  } catch (err) {
    res.status(500).json({
      error: "Update failed",
      details: err.message
    });
  }
};

// DELETE
const deleteCourse = async (req, res) => {
  try {
    const result = await getDB().collection("courses").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({
      error: "Delete failed",
      details: err.message
    });
  }
};

module.exports = {
  getAllCourses,
  getOneCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};