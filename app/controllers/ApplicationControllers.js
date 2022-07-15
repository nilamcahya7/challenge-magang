class ApplicationControllers {
  handleGetRoot = (req, res) => {
    res.status(200).json({
      status: 'OK',
      message: 'connected',
    });
  };

  handleError = (err, req, res, next) => {
    res.status(500).json({
      error: {
        name: err.name,
        message: err.message,
        details: err.details || null,
      },
    });
  };
}

module.exports = ApplicationControllers;
