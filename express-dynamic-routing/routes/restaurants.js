const express = require("express");
const uuid = require("uuid");

const resData = require("../util/restaurant-data");

const router = express.Router();

router.get("/restaurants", function (req, res) {
  const storedRestaurants = resData.getStoredRestaurants();
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});
//app.get("/restaurans/1") 이런 식으로 출력하는 것은 멍청한 짓이다.
router.get("/restaurants/:id", (req, res) => {
  //만약에 클라이언트가 /restaurants/where URI에 대해 get요청을 보내면
  //params객체는 {id: where}가 된다.
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId)
      return res.render("restaurant-detail", { restaurant: restaurant });
  }
  return res.render("404");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const storedRestaurants = resData.getStoredRestaurants();

  storedRestaurants.push(restaurant);
  resData.storeRestaurants(storedRestaurants);
  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});
module.exports = router;
