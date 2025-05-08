const express = require("express");
const router = express.Router();

const {
  filterfood,
  getAllCategories,

  getAllfoods,

  getfood,
} = require("../Controllers/FoodController");

router.get("/", getAllfoods);
router.get("/getallcategories", getAllCategories);
router.get("/category/:category", filterfood);
router.get("/Food/:id", getfood);

module.exports = router;
