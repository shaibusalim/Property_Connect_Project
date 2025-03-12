const express = require("express");
const {getAllProperties,addProperty,contactSeller} = require("../controllers/propertyController");
const upload = require("../utils/upload");

const router = express.Router();


router.get("/properties", getAllProperties);
router.post("/properties", upload.single("image"), addProperty);
router.post("/contact", contactSeller);

module.exports = router;