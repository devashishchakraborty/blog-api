import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, "public")));


app.get("/", (req, res) => {
  return res.send({
    name: { firstname: "Devashish", lastname: "Chakraborty" },
    age: 24,
  });
});

app.listen(port, () => {
  console.log(`Blog API listening on port ${port}`);
});
