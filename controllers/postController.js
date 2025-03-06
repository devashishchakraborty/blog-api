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
  const post = await prisma.post.create({
    data: {
      title: req.body.title,
      content: req.body.content,
      author_id: req.user.id,
    },
  });
  res.send(post);
});

const updatePost = asyncHandler(async (req, res) => {
  const post = await prisma.post.update({
    where: {
      id: parseInt(req.params.postId),
      author_id: req.user.id,
    },
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  });
  res.send(post);
});

const deletePost = asyncHandler(async (req, res) => {
  await prisma.post.delete({
    where: {
      id: parseInt(req.params.id),
      author_id: parseInt(req.user.id),
    },
  });
  res.sendStatus(200);
});

const addComment = asyncHandler(async (req, res) => {
  const comment = await prisma.comment.create({
    data: {
      author_name: req.body.name,
      author_email: req.body.email,
      text: req.body.text,
      post_id: parseInt(req.params.postId)
    },
  });
  res.send(comment);
});

export default {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment
};
