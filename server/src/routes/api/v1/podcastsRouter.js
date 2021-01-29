import express from "express"

import Podcast from "../../../models/Podcast.js"
import PodcastSerializer from "../../../serializers/PodcastSerializer.js"
import podcastReviewsRouter from './podcastReviewsRouter.js' 

const podcastsRouter = new express.Router()

podcastsRouter.get("/", async (req, res) => {
  try {
    const podcasts = await Podcast.query()

    const serializedPodcasts = []

    for (const podcast of podcasts) {
      const serializedPodcast = await PodcastSerializer.getSummary(podcast)
      serializedPodcasts.push(serializedPodcast)
    }

    res.status(200).json({ podcasts: serializedPodcasts })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

podcastsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const podcast = await Podcast.query().findById(id)
    const serializedPodcast = await PodcastSerializer.getSummary(podcast)
    
    res.status(200).json({ podcast: serializedPodcast })
  } catch (err) {
    res.status(500).json({ errors: err })
  }
})

podcastsRouter.use("/:podcastId/reviews", podcastReviewsRouter)

export default podcastsRouter
