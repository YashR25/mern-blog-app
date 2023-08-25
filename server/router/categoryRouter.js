const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

router.get("/latest?", categoryController.latestBlogController);
router.get("/popular?", categoryController.popularBlogController);

module.exports = router;
