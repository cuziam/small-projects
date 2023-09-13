const express = require("express");
const router = express.Router();
const db = require("../data/database");
router.get("/", (req, res) => {
  res.redirect("/posts");
});

router.get("/posts", (req, res) => {
  res.render("posts-list");
});

router.get("/new-post", async (req, res) => {
  const [authors] = await db.query("SELECT * FROM author");
  res.render("create-post", { authors: authors });
});

router.get("/");
module.exports = router;
