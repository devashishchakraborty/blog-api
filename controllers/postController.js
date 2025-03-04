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
    data: {
      title: req.body.title,
      content: req.body.content,
    },
    where: {
      id: parseInt(req.params.id),
      author_id: req.user.id,
    },
  });
  res.send(post);
});

const deletePost = asyncHandler(async (req, res) => {
  await prisma.post.delete({
    where: {
      id: parseInt(req.params.id),
      author_id: parseInt(req.user.id)
    }
  })
  res.sendStatus(200);
});

export default {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
