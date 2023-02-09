import express from "express";
import connectToMongoDB from "./db/db-connector";
import userRouter from "./users/router";
import postsRouter from "./posts/router";
import commentaireRouter from "./commentaires/router";
import profileRouter from "./profile/router";
import cors from "cors";
import { verifyToken } from "./users/auth/middleware";


connectToMongoDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", verifyToken, postsRouter);
app.use("/commentaires", verifyToken, commentaireRouter);
app.use("/profile", verifyToken, profileRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(4004, () => {
  console.log("Listening on port 4004");
});

export default app;