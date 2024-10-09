const Course = require('../models/Course');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
    const { title, description, teacher, students } = req.body;

    try {

        const teachUser = await User.findOne({ email: teacher });
        if (!teacherUser) {
            return res.status(404).json({ success: false, message: "Teacher not found" });
        }

        const studentUsers = await User.find({ 
            email: { $in: students }
         });
        const studentIds = studentUsers.map(user => user._id);


        const course = new Course({
            title,
            description,
            teacher: teachUser._id,
            students: studentIds,
        });

        await course.save();
        res.status(201).json({ success: true, data: course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find()
        .populate('teacher', 'name email')
        .populate('students', 'name email');
        
        res.status(200).json({ success: true, count: courses.length, data: courses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('teacher', 'name email').populate('students', 'name email');

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.status(200).json({ success: true, data: course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const { title, description, teacher, students } = req.body;
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        course.title = title || course.title;
        course.description = description || course.description;

        if (teacher) {
            const teacherUser = await User.findOne({ email: teacher });
            if (!teacherUser) {
                return res.status(404).json({ success: false, message: "Teacher not found" });
            }
            course.teacher = teacherUser._id;
        }

        if (students) {
            const studentUsers = await User.find({ email: { $in: students } });
            const studentIds = studentUsers.map(user => user._id);
            course.students = studentIds;
        }

        await course.save();
        res.status(200).json({ success: true, data: course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        await course.remove();
        res.status(200).json({ success: true, message: 'Course removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
