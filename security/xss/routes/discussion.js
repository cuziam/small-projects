const express = require("express");

const db = require("../data/database");

const router = express.Router();
const xss = require("xss");

router.get("/", function (req, res) {
  res.redirect("/discussion");
});

router.get("/discussion", async function (req, res) {
  const comments = await db.getDb().collection("comments").find().toArray();
  res.render("discussion", { comments: comments });
});

router.post("/discussion/comment", async function (req, res) {
  const comment = {
    text: xss(req.body.comment), //xss로 래핑해준다.
  };

  await db.getDb().collection("comments").insertOne(comment);

  res.redirect("/discussion");
});

module.exports = router;
