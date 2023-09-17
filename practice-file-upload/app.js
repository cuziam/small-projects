const path = require("path");

const express = require("express");

const userRoutes = require("./routes/users");
const db = require("./data/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//이 미들웨어는 인코딩의 기본 모드가 x-www-form-urlencoded로 되어 있다.
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(userRoutes);

db.connectToDatabase().then(function () {
  app.listen(4778);
});
