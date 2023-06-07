const express = require("express");
const { time } = require("../controller/blog");
const router = express.Router();
router.get("/", time);

module.exports = router;
