const response = {
  ok: (res, data) => {
    return res.status(200).json({
      success: true,
      data,
    });
  },

  created: (res, data) => {
    return res.status(201).json({
      success: true,
      data,
    });
  },

  error: (res, error) => {
    if (error.isJoi === true) {
      error.details = (error.details || []).map(({context : {key, value}, message}) => {
        return {
          field : key,
          value,
          message,
        }
      });
    }
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Server error',
      details: error.details || {},
    });
  },
};

module.exports = response;
