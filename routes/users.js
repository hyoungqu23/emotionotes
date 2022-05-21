const { Router } = require("express");

const { User, Note } = require("../models");

const router = Router();

router.get("/:shortId/notes", async (req, res) => {
  const { shortId } = req.params;
  const user = await User.findOne({ shortId });

  const page = Number(req.query.page || 1);
  const perPage = Number(req.query.perPage || 10);

  const [posts, totalPage] = await Post.getPaginatedPosts({ author: user }, page, perPage);

  res.render("post/list", { posts, page, perPage, totalPage, user, path: req.baseUrl + req.path });
});

module.exports = router;
