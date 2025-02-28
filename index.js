import express from "express";
import path from "path";
import routes from "./routes/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, "public")));

app.use("/posts", routes.postsRouter);

app.listen(port, () => {
  console.log(`Blog API listening on port ${port}`);
});
