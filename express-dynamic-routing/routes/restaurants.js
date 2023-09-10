const express = require("express");
const uuid = require("uuid");

const resData = require("../util/restaurant-data");

const router = express.Router();

router.get("/restaurants", function (req, res) {
  //sorting: ascending by id
  let order = req.query.order;
  let nextOrder = "desc";
  //default
  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }
  if (order === "desc") {
    nextOrder = "asc";
  }

  const storedRestaurants = resData.getStoredRestaurants();

  if (order === "asc") {
    storedRestaurants.sort((a, b) => a.name.localeCompare(b.name));
  } else if (order === "desc") {
    storedRestaurants.sort((a, b) => b.name.localeCompare(a.name));
  }

  console.log(storedRestaurants);
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder,
  });
});
//app.get("/restaurans/1") 이런 식으로 출력하는 것은 멍청한 짓이다.
router.get("/restaurants/:id", (req, res) => {
  //만약에 클라이언트가 /restaurants/where URI에 대해 get요청을 보내면
  //params객체는 {id: where}가 된다.
  const restaurantId = req.params.id;
  const storedRestaurants = resData.getStoredRestaurants();
  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
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
