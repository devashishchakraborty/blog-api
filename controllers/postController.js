import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

const getPosts = asyncHandler(async (req, res) => {
  const posts = await prisma.post.findMany({
    where: {
      author_id: req.user.id,
    },
  });
  res.send(posts);
});

const getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(postId),
      author_id: req.user.id,
    },
    include: {
      comments: true,
    },
  });
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  return res.send(post);
});

const createPost = asyncHandler(async (req, res) => {
  const {title, content, published} = req.body;
  const post = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author_id: req.user.id,
      published: published || false,
    },
  });
  res.send(post);
});

const updatePost = asyncHandler(async (req, res) => {
  const { title, content, published } = req.body;
  const data = {};
  if (title && content) {
    data.title = title;
    data.content = content;
  }

  if (published !== null) data.published = published;

  const post = await prisma.post.update({
    where: {
      id: parseInt(req.params.postId),
      author_id: req.user.id,
    },
    data,
  });

  res.send(post);
});

const deletePost = asyncHandler(async (req, res) => {
  const deletedPost = await prisma.post.delete({
    where: {
      id: parseInt(req.params.postId),
      author_id: req.user.id,
    },
  });
  res.send(deletedPost);
});

const addComment = asyncHandler(async (req, res) => {
  const comment = await prisma.comment.create({
    data: {
      author_name: req.body.name,
      author_email: req.body.email,
      text: req.body.text,
      post_id: parseInt(req.params.postId),
    },
  });
  res.send(comment);
});

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await prisma.comment.delete({
    where: {
      id: parseInt(req.params.commentId)
    }
  })
  res.send(comment);
})

export default {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment,
  deleteComment,
};
