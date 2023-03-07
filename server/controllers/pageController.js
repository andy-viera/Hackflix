const path = require("path");

const showHome = async (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
};

module.exports = { showHome };
