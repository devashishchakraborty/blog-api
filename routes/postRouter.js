import { Router } from "express";
import postController from "../controllers/postController.js";

const postRouter = Router();

postRouter.get("/", postController.getPosts);
postRouter.get("/:postId", postController.getPostById);
postRouter.post("/", postController.createPost);
postRouter.put("/:postId", postController.updatePost);
postRouter.delete("/:postId", postController.deletePost);

postRouter.post("/:postId/comments", postController.addComment);
postRouter.delete("/:postId/comments/:commentId", postController.deleteComment)
export default postRouter;