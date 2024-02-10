const express = require("express");
const multer = require("multer");
const fs = require("fs");

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const router = express.Router();

const { getAll, get, save, update, remove } = require("../controllers/recipes");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname); // Set the filename
  },
});

const upload = multer({ storage: storage });
router
  .route("/")

  .post(save);
router.route("/").get(getAll);

router.route("/delete").delete(remove);

router.route("/create").post(upload.single("profilePic"), save);

router.route("/update").put(upload.single("profilePic"), update);
module.exports = router;
