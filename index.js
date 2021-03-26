const express = require('express');
const app = express();
const winston = require('winston');
require('./statup/logging')();
require('./statup/routes')(app);
require('./statup/db')();
require('./statup/config')();
require('./statup/prod')(app);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    winston.info(`Started to listen ${port} port...`);
});

module.exports = server;