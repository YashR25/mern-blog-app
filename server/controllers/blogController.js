const Blog = require("../models/Blog");
const { success, error } = require("../utils/wrapper");

const commentController = async (req, res) => {
  const { name, comment, email, blogId } = req.body;
  const blog = await Blog.findById(blogId);
  const commentToAdd = {
    name,
    comment,
    email,
  };
  await blog.comments.push(commentToAdd);
  await blog.save();
  res.send(success(200, commentToAdd));
};

const likeBlogController = async (req, res) => {
  const { blogId } = req.body;
  try {
    const blog = await Blog.findById(blogId);
    await blog.likes++;
    await blog.save();
    res.send(success(200, blog));
  } catch (e) {
    res.send(error(400, e.message));
  }
};

const unLikeBlogController = async (req, res) => {
  const { blogId } = req.body;
  try {
    const blog = await Blog.findById(blogId);
    await blog.likes--;
    await blog.save();
    res.send(success(200, blog));
  } catch (e) {
    res.send(error(400, e.message));
  }
};

const getBlogController = async (req, res) => {
  const { blogId } = req.query;
  try {
    const blog = await Blog.findById(blogId);
    await blog.views++;
    blog.save();
    res.send(success(200, blog));
  } catch (e) {
    res.send(error(400, e.message));
  }
};

const searchBlogController = async (req, res) => {
  const { searchText, page, limit } = req.query;
  // const skip = (page - 1) * limit;
  // const blogs = await Blog.aggregate([
  //   { $text: { $search: searchText } },
  //   { $skip: skip },
  //   { $limit: Number(limit) },
  // ]);
  // await Blog.createIndex({
  //   title: "text",
  // });

  // const blogs = await Blog.find({ $text: { $search: searchText } }).limit(
  //   Number(limit)
  // );
  // const blogs = await Blog.find().skip(skip).limit(limit);
  // const filteredBlogs = await blogs.filter((blog) => {
  //   return blog.title.toLowerCase().includes(searchText.toLowerCase());
  // });
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const blogs = await Blog.find();
  const filteredBlogs = await blogs.filter((blog) => {
    return blog.title.toLowerCase().includes(searchText.toLowerCase());
  });
  const pageCount = await Math.ceil(filteredBlogs.length / limit);
  res.send(
    success(200, {
      blogs: filteredBlogs.slice(startIndex, endIndex),
      pageCount,
    })
  );
};

module.exports = {
  getBlogController,
  commentController,
  likeBlogController,
  unLikeBlogController,
  searchBlogController,
};
