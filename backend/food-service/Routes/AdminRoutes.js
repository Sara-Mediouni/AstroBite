const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  addfood,
  deletefood,
  updatefood,
} = require("../Controllers/FoodController");
const { authMiddleware } = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => cb(null, `${file.originalname}`),
});

const upload = multer({ storage: storage });


router.post("/", upload.single("image"),authMiddleware, addfood);


router.delete("/:id",authMiddleware, deletefood);

router.put("/:id",upload.single("image"),authMiddleware, updatefood);

module.exports = router;
