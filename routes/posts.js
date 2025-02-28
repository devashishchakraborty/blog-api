import { Router } from "express";

const postsRouter = Router();

postsRouter.get("/", (req, res) => {
  res.send({
    route: "Posts",
  });
});

// Getting post by Id
postsRouter.get("/:postId", (req, res) => {
  res.send({
    post_id: +req.params.postId,
  });
});

// Creating a new Post
postsRouter.post("/", (req, res) => {
  res.send({
    post_id: +req.params.postId,
  });
});

// Updating an Existing Post
postsRouter.put("/:postId", (req, res) => {
  res.send({
    post_id: +req.params.postId,
    text: req.body.text
  });
});

// Updating an Existing Post
postsRouter.delete("/:postId", (req, res) => {
  res.send({
    post_id: +req.params.postId,
    status: "deleted"
  });
});




export default postsRouter;
