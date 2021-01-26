import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import podcastsRouter from "./api/v1/podcastsRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/api/v1/podcasts", podcastsRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter); //place your server-side routes here
rootRouter.use("/", clientRouter);

export default rootRouter;
