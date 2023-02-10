// core app import 
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// db
import connectToMongoDB from "./db/db-connector";

// routes import 
import userRouter from "./users/router";
import postsRouter from "./posts/router";
import commentaireRouter from "./commentaires/router";
import profileRouter from "./profile/router";
import googleRouter from "./users/auth/google/router";

// Auth import 
import { verifyToken } from "./users/auth/middleware";
import passport from "passport";
import session from "express-session";
import "./users/auth/google/google_passport"


dotenv.config();
connectToMongoDB();

const port = process.env.PORT || 4004;
const app = express();

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(cors());
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth/google", googleRouter);
app.use("/users", userRouter);
app.use("/posts", verifyToken, postsRouter);
app.use("/commentaires", verifyToken, commentaireRouter);
app.use("/profile", verifyToken, profileRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default app;