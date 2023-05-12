const path = require("path")

module.exports = {
  // ...
  resolve: {
    // ...
    fallback: {
      "http": false,
      "https": false,
      "crypto": false,
      "stream": false,
      "buffer": false
    }
  }
  // ...
};
