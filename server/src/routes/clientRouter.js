import express from "express"
import getClientIndexPath from "../config/getClientIndexPath.js"

const router = new express.Router()

const clientRoutes = [
  "/",
  "/user-sessions/new",
  "/users/new",
  "/podcasts",
  "/genres",
  "/podcasts/:id",
  "/genres/:id",
  "/profile",
  "/genres/new",
  "podcasts/new",
]
router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath())
})

export default router
