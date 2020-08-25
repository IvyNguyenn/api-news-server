var express = require("express");
var NewsController = require("../controllers/NewsController");

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

router.get("/news", NewsController.getAllNews);
router.post("/single-news", NewsController.getNew);

module.exports = router;
