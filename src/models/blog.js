const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: true,
      trim: true,
    },

    blogDescription: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
