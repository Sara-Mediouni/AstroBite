const express = require("express");
const router = express.Router();

const {
  addfood,
  deletefood,
  filterfood,
  getAllCategories,
  updatefood,
  getAllfoods,

  getfood
} = require("../Controllers/FoodController");

const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${file.originalname}`),
});

const upload = multer({ storage: storage });

router.get("/", getAllfoods);

router.get('/getallcategories',getAllCategories);
router.get("/category/:category", filterfood);
router.get("/Food/:id", getfood)



;
// Ajouter un plat
router.post("/", upload.single("image"), addfood);

// Supprimer un plat
router.delete("/:id", deletefood);



// Mettre à jour un plat
router.put("/:id", updatefood);

console.log('Routes loaded');

module.exports = router;
