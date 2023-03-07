// pageRoutes.js

const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.get("/", pageController.showHome);

router.get("*", function (req, res) {
  res.status(404).send("Not found");
});

module.exports = router;
