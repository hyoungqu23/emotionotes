const { Router } = require("express");
const { Note } = require("../models/index");

const router = Router();

// READ 게시글 전체 목록 조회하기: GET 요청
router.get("/", async (req, res, next) => {
  if (req.query.write) {
    res.render("note/write");
    return;
  }

  const notes = await Note.find({});

  res.render("note/list", { notes });
});

// CREATE 게시글 작성하기: POST 요청
router.post("/", async (req, res, next) => {
  const { title, content } = req.body;
  try {
    await Note.create({
      title,
      content,
    });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
