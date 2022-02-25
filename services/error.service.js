module.exports = (res, {statusCode, message}) => {
    return res.status(statusCode || 500).json({
        message: message || "error",
        error: true
    });
}