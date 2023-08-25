const Blog = require("../models/Blog");
const { success, error } = require("../utils/wrapper");

const latestBlogController = async (req, res) => {
  const { page, limit, category } = req.query;
  const skip = (page - 1) * limit;
  let blogs;
  if (!category) {
    blogs = await Blog.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: Number(limit) },
    ]);
  } else {
    blogs = await Blog.aggregate([
      { $match: { category: category } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: Number(limit) },
    ]);
  }
  const blogCountarr = await Blog.aggregate([
    { $match: { category: category } },
    { $count: "pageCount" },
  ]);
  const pageCount = await blogCountarr[0].pageCount;

  res.send(success(200, { blogs, pageCount: Math.ceil(pageCount / limit) }));
};

const popularBlogController = async (req, res) => {
  const { category } = req.query;
  let blogs;

  try {
    if (category) {
      const blogs = await Blog.aggregate([
        { $match: { category: category } },
        { $sort: { views: -1 } },
        { $limit: 3 },
      ]);
      res.send(success(200, blogs));
    }
  } catch (e) {
    res.send(error(400, e.message));
  }
};

module.exports = { latestBlogController, popularBlogController };
