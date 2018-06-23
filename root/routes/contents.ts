import * as express from "express";

const router = express.Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.status(200).json({ title: "webtoons contents" });
});
export default router;
