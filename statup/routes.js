const express = require('express');
const errorMiddleware = require('../middleware/error');
const categoriesRoute = require('../routes/categories');
const customerRoute = require('../routes/customers');
const coursesRoute = require('../routes/courses');
const enrollmentRoute = require('../routes/enrollments');
const userRoute = require('../routes/users');
const authRoute = require('../routes/auth');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/categories', categoriesRoute);
    app.use('/api/customers', customerRoute);
    app.use('/api/courses', coursesRoute);
    app.use('/api/enrollments', enrollmentRoute);
    app.use('/api/users', userRoute);
    app.use('/api/auth', authRoute);
    app.use(errorMiddleware);
}