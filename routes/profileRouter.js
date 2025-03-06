import { Router } from "express";
import profileController from "../controllers/profileController.js";
const userRouter = Router();

userRouter("/", profileController.getProfile);