const config = require('config');

module.exports = function () {
    if(!config.get('jwtPrivateKey')){
        throw new Error("Error: virtualdars_jwtPrivateKey is not defined.");

    }
}