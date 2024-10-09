const express = require('express');
const {
  createGrade,
  getAllGrades,
  getGradeById,
  updateGrade,
  deleteGrade,
} = require('../controllers/gradeController');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', protect, authorizeRoles('Teacher', 'Admin'), createGrade);
router.get('/', protect, authorizeRoles('Admin', 'Teacher'), getAllGrades);
router.get('/:id', protect, authorizeRoles('Admin', 'Teacher', 'Student'), getGradeById);
router.put('/:id', protect, authorizeRoles('Teacher', 'Admin'), updateGrade);
router.delete('/:id', protect, authorizeRoles('Admin'), deleteGrade);

module.exports = router;
