const express = require('express');
const router = express.Router();
const courseController = require('../controllers/Course');
const authenticateToken = require('../middleware/authMiddleware');

// Create a new course
router.post('/courses', authenticateToken, courseController.createCourse);

// Get all courses
router.get('/courses', authenticateToken, courseController.getAllCourses);

// Get a course by ID
router.get('/courses/:id', authenticateToken, courseController.getCourseById);

// Update a course by ID
router.put('/courses/:id', authenticateToken, courseController.updateCourse);

// Delete a course by ID
router.delete('/courses/:id', authenticateToken, courseController.deleteCourse);

module.exports = router;
