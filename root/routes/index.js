"use strict";
exports.__esModule = true;
var express = require("express");
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.status(200).json({ title: 'Express' });
});
exports["default"] = router;
