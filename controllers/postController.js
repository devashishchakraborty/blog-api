import { Prisma } from "@prisma/client";

const posts = [
  {
    id: 69,
    title: "Title 1",
    content: "Hello Boys",
    authorName: "Devashish",
  },
  {
    id: 420,
    title: "Title 2",
    content: "Hello Girls",
    authorName: "Rahul",
  },
];

const getPosts = (req, res) => {
  res.send(posts.filter((post) => post.authorName === req.user.name));
};

const getPostById = (req, res) => {
  res.send(posts.filter((post) => post.id == req.params.postId)[0]);
};

const createPost = (req, res) => {
  posts.push({
    id: posts.at(-1).id + 1,
    title: req.body.title,
    content: req.body.content,
  });
  res.send(posts);
};

const updatePost = (req, res) => {
  res.send({
    post_id: +req.params.postId,
    title: req.body.title,
  });
};

const deletePost = (req, res) => {
  res.send({
    post_id: +req.params.postId,
    status: "deleted",
  });
};

export default {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
