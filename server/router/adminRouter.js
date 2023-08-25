const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { requireUser } = require("../middlewears/requireUser");

router.post("/addBlog", requireUser, adminController.addBlogController);
router.post("/uploadImage", requireUser, adminController.uploadImageController);
router.get(
  "/getAdminData?",
  requireUser,
  adminController.getAdminDataController
);
router.put("/updateBlog?", requireUser, adminController.updateBlogController);
router.delete(
  "/deleteBlog?",
  requireUser,
  adminController.deleteBlogController
);
router.get("/chartData", requireUser, adminController.chartDataController);

module.exports = router;
