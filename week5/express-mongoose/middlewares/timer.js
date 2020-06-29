moment = require('moment');

const timestamp = function() {
    return moment().format('MM-DD-YYYY h:mm:ss a');
}

module.exports = timestamp;