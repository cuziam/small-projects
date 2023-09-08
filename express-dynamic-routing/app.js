const path = require("path");

const express = require("express");

const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurants");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/", defaultRoutes);
app.use("/", restaurantRoutes);

//존재하지 않는 URI에 대한 요청을 처리하기 위해
//app의 끝부분에 이를 처리할 수 있는 미들웨어 함수를 추가해준다.
app.use((req, res) => {
  res.statusCode = 404;
  res.status(404).render("404"); //res.status()는 this를 반환하므로 괜춘
});

app.use((error, req, res, next) => {
  res.status(500).render("500");
});

app.listen(4788);
