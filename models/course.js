const mongoose = require('mongoose');
const Joi = require('joi');
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 250
    },
    tags: [String],
    category: {
        type: Object,
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        required: true
    },
    trainer: String,
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: true
    },
    fee: {
        type: Number,
        required: true
    }
});
const Course = mongoose.model('Course', courseSchema);

function validateCourse(course) {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        trainer: Joi.string().required(),
        status: Joi.string().required(),
        categoryId: Joi.string().required(),
        tags: Joi.array().items(Joi.string()),
        fee: Joi.number().required()
    });
    return schema.validate(course);
}

exports.Course = Course;
exports.validate = validateCourse;