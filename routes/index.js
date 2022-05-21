const express = require("express");
const { User } = require("../models");
const hashPassword = require("../utils/hashpassword");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  if (req.user) {
    res.redirect("/notes"); // 홈페이지('/' 경로) 진입 시 게시글 페이지('/notes' 경로)로 바로 이동
    return;
  }

  res.redirect("/login");
});

router.get("/login", (req, res, next) => {
  res.render("user/login");
});

router.get("/join", (req, res, next) => {
  res.render("user/join");
});

router.post("/join", (req, res, next) => {
  const { email, name, password } = req.body;
  const hashedPassword = hashPassword(password);
  const user = User.create({
    email,
    name,
    password: hashedPassword,
  });

  res.redirect("/");
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
