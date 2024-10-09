const express = require('express');
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', protect, authorizeRoles('Admin'), createCourse);
router.get('/', protect, authorizeRoles('Admin', 'Teacher', 'Student'), getAllCourses);
router.get('/:id', protect, authorizeRoles('Admin', 'Teacher', 'Student'), getCourseById);
router.put('/:id', protect, authorizeRoles('Admin'), updateCourse);
router.delete('/:id', protect, authorizeRoles('Admin'), deleteCourse);

module.exports = router;
