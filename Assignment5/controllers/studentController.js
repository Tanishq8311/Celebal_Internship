const Student = require('../models/Student');

// Create a new student
const createStudent = async (req, res) => {
  const { name, age, major } = req.body;
  try {
    const student = new Student({ name, age, major });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Read all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Read a single student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a student by ID
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a student by ID
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
