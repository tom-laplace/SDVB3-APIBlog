import express from "express";
import connectToMongoDB from "./db/db-connector";
import userRouter from "./src/users/router";


connectToMongoDB();

const app = express();

app.use(express.json());
app.use("/users", userRouter);

app.listen(4004, () => {
  console.log("Listening on port 4004");
});
