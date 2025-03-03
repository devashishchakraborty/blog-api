import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import passport from "../config/passport.js";

const prisma = new PrismaClient();
const validateSignUp = [
  body("email")
    .toLowerCase()
    .trim()
    .custom(async (value) => {
      const users = await prisma.user.findMany();
      const emailIds = users.map((user) => user.email.toLowerCase());
      if (emailIds.includes(value)) {
        throw new Error("Email already exists! Try a different one.");
      }
    }),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("The passwords do not match"),
];

const userSignUp = [
  validateSignUp,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });
    res.sendStatus(200);
  }),
];

const userLogin = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return res.status(400).send({ err });
    if (!user) {
      return res.status(400).send({ err: { msg: info.message } });
    }
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "500s",
    });
    return res.send({ accessToken });
  })(req, res, next);
};

export default {
  userLogin,
  userSignUp,
};
