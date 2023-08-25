const Blog = require("../models/Blog");
const { success } = require("../utils/wrapper");
const cloudinary = require("cloudinary").v2;

const addBlogController = async (req, res) => {
  const { title, image, content, category } = req.body;
  const cloudImage = await cloudinary.uploader.upload(image, {
    folder: "blogImg",
  });
  const createdBlog = await Blog.create({
    title: title,
    thumbnail: {
      url: cloudImage.url,
    },
    content: content,
    views: 0,
    likes: 0,
    comments: [],
    category: category,
  });
  res.send(success(200, createdBlog));
};

const uploadImageController = async (req, res) => {
  const { image } = req.body;
  try {
    const cloudImage = await cloudinary.uploader.upload(image, {
      folder: "blogImg",
    });
    res.send(success(200, cloudImage.url));
  } catch (error) {
    res.send(error(400, error.message));
  }
};

const getAdminDataController = async (req, res) => {
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;
  const blogs = await Blog.aggregate([
    {
      $sort: { createdAt: -1 },
    },
    {
      $skip: skip,
    },
    {
      $limit: Number(limit),
    },
  ]);
  const barChartData = await Blog.aggregate([
    {
      $group: {
        _id: "$category",
        likes: { $sum: "$likes" },
        views: { $sum: "$views" },
      },
    },
  ]);
  const pieChartData = await Blog.aggregate([
    { $group: { _id: "$category", blogsCount: { $sum: 1 } } },
  ]);
  const blogsCount = await Blog.countDocuments();
  res.send(
    success(200, {
      blogs,
      chartData: { barChartData, pieChartData },
      pageCount: Math.ceil(blogsCount / 4),
    })
  );
};

const updateBlogController = async (req, res) => {
  const { id } = req.query;
  const { title, image, content, category } = req.body;
  const blog = await Blog.findById(id);
  if (title) {
    blog.title = title;
  }

  if (image) {
    const cloudImage = await cloudinary.uploader.upload(image, {
      folder: "blogImg",
    });
    blog.image = cloudImage.url;
  }

  if (content) {
    blog.content = content;
  }

  if (category) {
    blog.category = category;
  }

  await blog.save();
  res.send(success(200, blog));
};

const deleteBlogController = async (req, res) => {
  const { id } = req.query;
  const blog = await Blog.deleteOne({ _id: id });
  res.send(success(200, "Post Deleted Successfully"));
};

const chartDataController = async (req, res) => {
  try {
    const barChartData = await Blog.aggregate([
      {
        $group: {
          _id: "$category",
          likes: { $sum: "$likes" },
          views: { $sum: "$views" },
        },
      },
    ]);
    const pieChartData = await Blog.aggregate([
      { $group: { _id: "$category", blogsCount: { $sum: 1 } } },
    ]);
    res.send(success(200, { barChartData, pieChartData }));
  } catch (error) {
    res.send(error(400, "something went wrong"));
  }
};

module.exports = {
  addBlogController,
  uploadImageController,
  getAdminDataController,
  updateBlogController,
  deleteBlogController,
  chartDataController,
};
