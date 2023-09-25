const User = require("../models/user");
const validationSession = require("../util/validation-session");
const validation = require("../util/validation");

function getSignup(req, res) {
  const sessionErrorData = validationSession.getSessionErrorData(req, {
    email: "",
    confirmEmail: "",
    password: "",
  });

  res.render("signup", {
    inputData: sessionErrorData,
  });
}

function getLogin(req, res) {
  const sessionErrorData = validationSession.getSessionErrorData(req, {
    email: "",
    password: "",
  });
  res.render("login", {
    inputData: sessionErrorData,
  });
}

function postSignup(req, res) {}

function postLogin(req, res) {}

function postLogout(req, res) {}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  postSignup: postSignup,
  postLogin: postLogin,
  postLogout: postLogout,
};
