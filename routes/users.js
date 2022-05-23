const { Router } = require("express");

const { User, Note } = require("../models");

const router = Router();

router.get("/:shortId/notes", async (req, res) => {
  const { shortId } = req.params;
  const user = await User.findOne({ shortId });
  if (!user) {
    throw new Error("해당 작성자가 없습니다.");
  }

  const page = Number(req.query.page || 1);
  const perPage = Number(req.query.perPage || 10);

  const [notes, totalPage] = await Note.getPaginatedPosts({ author: user }, page, perPage);

  res.render("note/list", { notes, page, perPage, totalPage, user, path: req.baseUrl + req.path });
});

module.exports = router;
