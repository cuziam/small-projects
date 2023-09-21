const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  //이전에 저장된 세션 데이터가 있다면 이를 활용한다.
  //없다면 초기화 시켜준다.
  let sessionInputData = req.session.inputData;
  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      confirmEmail: "",
      password: "",
    };
  }
  //한번 사용한 세션 데이터는 null처리 해준다.=>안 하면 마지막 작성 값이 계속 뜰거다.
  req.session.inputData = null;

  res.render("signup", { inputData: sessionInputData });
});

router.get("/login", function (req, res) {
  let sessionInputData = req.session.inputData;
  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      password: "",
    };
  }
  res.render("login", { inputData: sessionInputData });
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
    //데이터 유효성 검증 통과 못할 시
    //사용자가 기존에 입력한 데이터와 에러메세지등을 session에 저장한다.
    //그리고 리디렉션.
    req.session.inputData = {
      hasError: true,
      message: "Invalid input-please check your data",
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
    };
    req.session.save(() => {
      res.redirect("/signup");
    });
    return; //return으로 라우팅을 종료해주지 않으면 아래 코드가 실행된다.
  }

  //이미 가입된 이메일이 있다면 리디렉션.
  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });
  if (existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "user exists already!",
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
    };
    req.session.save(() => {
      res.redirect("/signup");
    });
    return;
  }
  //모든 검증을 통과하면 유저 정보 저장.
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
    req.session.inputData = {
      hasError: true,
      message: "Could not log you in, Please check your credential",
      email: enteredEmail,
      password: enteredPassword,
    };
    console.log("등록된 이메일이 없습니다.");
    return res.redirect("/login");
  }
  const passwordsAreEqual = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  );
  if (!passwordsAreEqual) {
    req.session.inputData = {
      hasError: true,
      message: "Could not log you in, Please check your credential",
      email: enteredEmail,
      password: enteredPassword,
    };
    console.log("패스워드가 일치하지 않습니다.");
    req.session.save(() => {
      res.redirect("/login");
    });
    return;
  }

  console.log("로그인 인증이 완료되었습니다.");

  req.session.user = {
    id: existingUser._id,
    email: existingUser.email,
  };
  req.session.isAuthenticated = true;
  req.session.save(() => {
    //세션 데이터 베이스에 강제저장 후 리디렉션, 이걸 안 하면 저장보다 리디렉션이 우선적으로 실행될 수도 있다.
    res.redirect("/profile");
  });
});

router.get("/admin", async function (req, res) {
  //Check the user "ticket"
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }

  const user = await db
    .getDb()
    .collection("users")
    .findOne({ _id: req.session.user.id });
  if (!user || !user.isAdmin) {
    res.status(403).render("403");
    return;
  }
  res.render("admin");
});

router.get("/profile", function (req, res) {
  //Check the user "ticket"
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }
  res.render("profile");
});

router.post("/logout", function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
});

module.exports = router;
