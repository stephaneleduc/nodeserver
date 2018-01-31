const logger = function (req, res, next) {

    console.log ("----- New Request -----");
    console.log (req.url);

    req.logs = "This was log";
    next(); //Next Middleware

}

module.exports = logger;