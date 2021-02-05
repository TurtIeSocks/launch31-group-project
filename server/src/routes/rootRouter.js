import express from "express"
import userSessionsRouter from "./api/v1/userSessionsRouter.js"
import usersRouter from "./api/v1/usersRouter.js"
import clientRouter from "./clientRouter.js"
import podcastsRouter from "./api/v1/podcastsRouter.js"
import genresRouter from "./api/v1/genresRouter.js"
import reviewsRouter from "./api/v1/reviewsRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/user-sessions", userSessionsRouter)
rootRouter.use("/api/v1/users", usersRouter)
rootRouter.use("/api/v1/genres", genresRouter)
rootRouter.use("/api/v1/podcasts", podcastsRouter)
rootRouter.use("/api/v1/reviews", reviewsRouter )
rootRouter.use("/", clientRouter)

export default rootRouter
