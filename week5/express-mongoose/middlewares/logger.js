const timer = require('./timer');

const logger = (req, res, next) => {
    console.log(timer(), ':', req.method, req.url, res.statusCode);
    next();
}

module.exports = logger;