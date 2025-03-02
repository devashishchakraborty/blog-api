import { Router } from "express";
import postController from "../controllers/postController.js";

const postsRouter = Router();

postsRouter.get("/", postController.getPosts);
postsRouter.get("/:postId", postController.getPostById);
postsRouter.post("/", postController.createPost);
postsRouter.put("/:postId", postController.updatePost);
postsRouter.delete("/:postId", postController.deletePost);

export default postsRouter;
