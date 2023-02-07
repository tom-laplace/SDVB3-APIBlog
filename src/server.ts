import express from "express";
import connectToMongoDB from "./db/db-connector";
import userRouter from "./users/router";
import postsRouter from "./posts/router";
import commentaireRouter from "./commentaires/router";


connectToMongoDB();

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postsRouter);
app.use("/commentaires", commentaireRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(4004, () => {
  console.log("Listening on port 4004");
});

export default app;