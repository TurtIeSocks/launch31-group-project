import express from "express"

import Podcast from "../../../models/Podcast.js"
import PodcastSerializer from "../../../serializers/PodcastSerializer.js"
import podcastReviewsRouter from './podcastReviewsRouter.js' 

const podcastsRouter = new express.Router()

podcastsRouter.get("/", async (req, res) => {
  try {
    const podcasts = await Podcast.query()

    const serializedPodcasts = podcasts.map((podcast) => {
      return PodcastSerializer.getSummary(podcast)
    })

    res.status(200).json({ podcasts: serializedPodcasts })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

podcastsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const podcast = await Podcast.query().findById(id)
    podcast.reviews = await podcast.$relatedQuery('reviews')
    const serializedPodcast = PodcastSerializer.getSummary(podcast)
    res.status(200).json({ podcast: serializedPodcast })
  } catch (err) {
    res.status(500).json({ errors: err })
  }
})

podcastsRouter.use("/:podcastId/reviews", podcastReviewsRouter)

export default podcastsRouter
