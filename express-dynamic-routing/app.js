const fs = require("fs");
const path = require("path");

const express = require("express");
const uuid = require("uuid");

const resData = require("./util/restaurant-data");
const defaultRoutes = require("./routes/default");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/", defaultRoutes);

app.get("/restaurants", function (req, res) {
  const storedRestaurants = resData.getStoredRestaurants();
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});
//app.get("/restaurans/1") 이런 식으로 출력하는 것은 멍청한 짓이다.
app.get("/restaurants/:id", (req, res) => {
  //만약에 클라이언트가 /restaurants/where URI에 대해 get요청을 보내면
  //params객체는 {id: where}가 된다.
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId)
      return res.render("restaurant-detail", { restaurant: restaurant });
  }
  return res.render("404");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const storedRestaurants = resData.getStoredRestaurants();

  storedRestaurants.push(restaurant);
  resData.storeRestaurants(storedRestaurants);
  res.redirect("/confirm");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

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
