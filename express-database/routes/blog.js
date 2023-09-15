const express = require("express");
const router = express.Router();
const db = require("../data/database");
router.get("/", (req, res) => {
  res.redirect("/posts");
});

router.get("/posts", async (req, res) => {
  const query = `SELECT post.*, author.name AS author_name FROM post INNER JOIN author ON post.author_id=author.id`;
  const [posts] = await db.query(query);
  console.log(posts);
  res.render("posts-list", { posts: posts });
});

router.get("/new-post", async (req, res) => {
  const [authors] = await db.query("SELECT * FROM author");
  res.render("create-post", { authors: authors });
});

router.post("/posts", async (req, res) => {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];
  await db.query(
    "INSERT INTO post (title, summary, body, author_id) VALUES (?)",
    [data]
  );
  res.redirect("/posts");
});

router.get("/posts/:id", async (req, res) => {
  const query = `
  SELECT post.*, author.name as author_name, author.email as author_email
  FROM post INNER JOIN author
  ON post.author_id=author.id
  WHERE post.id= ?`;
  const [posts] = await db.query(query, [req.params.id]);
  if (!posts || posts.length === 0) {
    res.status(404).render("404");
  }
  const postData = {
    ...posts[0],
    date: posts[0].date.toISOString(),
    humanReadableDate: posts[0].date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
  res.render("post-detail", { post: postData });
});

router.get("/posts/:id/edit", async (req, res) => {
  const query = `
  SELECT * FROM post WHERE id=?
  `;
  const [posts] = await db.query(query, [req.params.id]);
  if (!posts || posts.length === 0) {
    res.status(404).render("404");
  }
  res.render("update-post", { post: posts[0] });
});

router.post("/posts/:id/edit", async (req, res) => {
  const query = `
  UPDATE post SET title=?, summary=?, body=? 
  WHERE id=?`;
  await db.query(query, [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.params.id,
  ]);
  res.redirect("/posts");
});

router.post("/posts/:id/delete", async (req, res) => {
  await db.query("DELETE FROM post WHERE id=?", [req.params.id]);
  res.redirect("/posts");
});
module.exports = router;
