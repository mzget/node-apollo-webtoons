"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
/* GET home page. */
router.get("/", (req, res, next) => {
    res.status(200).json({ title: "Express" });
});
exports.default = router;
