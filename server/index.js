const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./db/dbConnect");
const Blog = require("./models/Blog");
const categoryRouter = require("./router/categoryRouter");
const cloudinary = require("cloudinary").v2;
const blogRouter = require("./router/blogRouter");
const adminRouter = require("./router/adminRouter");
const authRouter = require("./router/authRouter");
const cookieParser = require("cookie-parser");
const { success } = require("./utils/wrapper");

dotenv.config("./.env");

dbConnect();

const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: `${process.env.FRONTEND_URL}`,
  })
);

app.listen(PORT, () => {
  console.log("listening to PORT ", PORT);
});

cloudinary.config({
  cloud_name: "dhoaklhi3",
  api_key: "256575176567522",
  api_secret: `${process.env.CLOUDINARY_SECRET_KEY}`,
});

// app.get("/postDummyData", async (req, res) => {
//   const createdBlog = await Blog.create({
//     title: "title",
//     thumbnail: {
//       url: "cloudImage.url",
//     },
//     content: "content",
//     views: 0,
//     likes: 0,
//     comments: [],
//     category: "category",
//   });
//   res.send(createdBlog);
// });

app.get("/getLatestBlogs?", async (req, res) => {
  const { page, limit } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const blogs = await Blog.aggregate([
    { $sort: { createdAt: -1 } },
    { $skip: Number(skip) },
    { $limit: 4 },
  ]);

  res.send(success(200, blogs));
});

app.get("/getAllData", async (req, res) => {
  const trendingPosts = await Blog.aggregate([
    { $sort: { views: -1 } },
    { $limit: 4 },
  ]);
  const latestBlogs = await Blog.aggregate([
    { $sort: { createdAt: -1 } },
    { $limit: 4 },
  ]);
  const pageCount = await Blog.countDocuments();
  res.send(
    success(200, {
      trendingPosts,
      latestBlogs,
      pageCount: Math.ceil(pageCount / 4),
    })
  );
});

app.use("/blog", blogRouter);

app.use("/category", categoryRouter);

app.use("/admin", adminRouter);

app.use("/auth", authRouter);
