const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post(
  "/",
  middleware.userExtractor,
  async (request, response, next) => {
    const user = request.user;

    const body = request.body;
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });

    try {
      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      response.status(201).json(savedBlog);
    } catch (expection) {
      next(expection);
    }
  }
);

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    const user = request.user;

    const findBlog = await Blog.findById(request.params.id);
    if (user.id.toString() !== findBlog.user.toString()) {
      return response.status(401).json({ error: "invalid user" });
    }

    try {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } catch (expection) {
      next(expection);
    }
  }
);

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const body = request.body;
    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      newBlog,
      { new: true }
    );
    response.json(updatedBlog);
  } catch (expection) {
    next(expection);
  }
});

blogsRouter.post("/:id/comments", async (request, response, next) => {
  try {
    const { content } = request.body;

    const findBlog = await Blog.findById(request.params.id);
    const newComment = { content };
    findBlog.comments = findBlog.comments.concat(newComment);
    const savedComment = await findBlog.save();
    response.status(201).json(savedComment);
  } catch (expection) {
    next(expection);
  }
});

blogsRouter.get("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog.comments);
});

module.exports = blogsRouter;
