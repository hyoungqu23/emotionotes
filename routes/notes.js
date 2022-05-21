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

// READ 게시글 조회하기: GET 요청
router.get("/:shortId", async (req, res, next) => {
  const { shortId } = req.params;
  const note = await Note.findOne({ shortId });

  if (req.query.write) {
    res.render("note/write", { note });
  }

  res.render("note/view", { note });
});

// CREATE 게시글 작성하기: POST 요청
router.post("/", async (req, res, next) => {
  const { title, content } = req.body;
  try {
    if (!title || !content) {
      throw new Error("감정과 설명을 작성해 주세요.");
    }

    const note = await Note.create({
      title,
      content,
    });
    res.redirect(`/notes/${note.shortId}`);
  } catch (error) {
    next(error);
  }
});

// UPDATE 게시글 수정하기: POST 요청
router.post("/:shortId", async (req, res, next) => {
  const { shortId } = req.params;
  const { title, content } = req.body;

  try {
    if (!title || !content) {
      throw new Error("감정과 설명을 작성해 주세요.");
    }

    await Note.updateOne(
      { shortId },
      {
        title,
        content,
      }
    );
    res.redirect(`/notes/${shortId}`);
  } catch (error) {
    next(error);
  }
});

router.delete("/:shortId", async (req, res, next) => {
  const { shortId } = req.params;
  await Note.deleteOne({ shortId });
  res.send("OK");
});

module.exports = router;
