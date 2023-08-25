const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      url: String,
    },
    content: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      required: true,
    },
    likes: {
      type: Number,
    },
    category: {
      type: String,
      required: true,
    },
    comments: [
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

blogSchema.index({ title: "text" });

const model = mongoose.model("Blog", blogSchema);
model.createIndexes();
module.exports = model;
