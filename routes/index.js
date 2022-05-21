var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.redirect("/notes"); // 홈페이지('/' 경로) 진입 시 게시글 페이지('/notes' 경로)로 바로 이동
});

module.exports = router;
