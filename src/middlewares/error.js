const errorHandler = (err, req, res, next) => {
    if (err) {
        res.send("Global error handler - Something went wrong!!");
    }
}

module.exports = {
    errorHandler
}