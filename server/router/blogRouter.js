const router = require("express").Router();
const blogController = require("../controllers/blogController");

router.post("/comment", blogController.commentController);
router.get("/?", blogController.getBlogController);
router.post("/like", blogController.likeBlogController);
router.post("/unLike", blogController.unLikeBlogController);
router.get("/search?", blogController.searchBlogController);

module.exports = router;
