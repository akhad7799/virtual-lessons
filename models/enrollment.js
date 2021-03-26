const Joi = require('joi');
const mongoose = require('mongoose');

const Enrollment = mongoose.model('Enrollment', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            }
        }),
        required: true
    },
    course: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            }
        }),
        required: true
    },
    dateStart: {
        type: Date,
        required: true,
        default: Date.now
    },
    courseFee: {
        type: Number,
        min: 0
    }
}));

function validateEnrollment(enrollment) {
    const schema = Joi.object({
        customerId: Joi.string().required(),
        courseId: Joi.string().required(),
        courseFee: Joi.number(),
        dateStart: Joi.date()
    });
    return schema.validate(enrollment);
}

exports.Enrollment = Enrollment;
exports.validate = validateEnrollment;