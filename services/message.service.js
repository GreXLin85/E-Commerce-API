module.exports = (res, message) => {
    return res.status(200).json({
      message: message,
      error: false
    });
  }