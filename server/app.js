const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const database = require("./database");

const usersRouter = require("./routes/users");
const todosRouter = require("./routes/todos");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter, todosRouter, postsRouter, commentsRouter);

module.exports = app;
