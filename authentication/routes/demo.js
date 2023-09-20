const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  res.render("signup");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/signup", async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredConfirmEmail = userData["confirm-email"];
  const enteredPassword = userData.password;
  //제출된 form에 대한 유효성 검증
  if (
    !enteredEmail ||
    !enteredConfirmEmail ||
    !enteredPassword ||
    enteredPassword.trim().length < 6 ||
    enteredEmail !== enteredConfirmEmail ||
    !enteredEmail.includes("@")
  ) {
    //데이터 유효성 검증 통과 못할 시, 에러메세지 출력 후 리디렉션.
    console.log("not valid data");
    return res.redirect("/signup");
  }

  //이미 가입된 이메일이 있다면 리디렉션.
  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });
  if (existingUser) {
    console.log("User exists already");
    return res.redirect("/signup");
  }
  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  const user = {
    email: enteredEmail,
    password: hashedPassword,
  };
  console.log(hashedPassword);
  await db.getDb().collection("users").insertOne(user);

  res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });
  if (!existingUser) {
    console.log("등록된 이메일이 없습니다.");
    return res.redirect("/login");
  }
  const passwordsAreEqual = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  );
  if (!passwordsAreEqual) {
    console.log("패스워드가 일치하지 않습니다.");
    return res.redirect("/login");
  }

  console.log("로그인 인증이 완료되었습니다.");

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(() => {
    //세션 데이터 베이스에 강제저장 후 리디렉션, 이걸 안 하면 저장보다 리디렉션이 우선적으로 실행될 수도 있다.
    res.redirect("/admin");
  });
});

router.get("/admin", function (req, res) {
  //Check the user "ticket"
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }
  res.render("admin");
});

router.post("/logout", function (req, res) {});

module.exports = router;
