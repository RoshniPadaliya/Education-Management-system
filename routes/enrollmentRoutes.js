const express = require('express');
const {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
} = require('../controllers/enrollmentController');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', protect, authorizeRoles('Admin', 'Student'), createEnrollment);
router.get('/', protect, authorizeRoles('Admin', 'Teacher'), getAllEnrollments);
router.get('/:id', protect, authorizeRoles('Admin', 'Teacher', 'Student'), getEnrollmentById);
router.put('/:id', protect, authorizeRoles('Admin'), updateEnrollment);
router.delete('/:id', protect, authorizeRoles('Admin'), deleteEnrollment);

module.exports = router;
