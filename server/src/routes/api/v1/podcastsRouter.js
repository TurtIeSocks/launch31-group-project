import express from "express"

import Podcast from "../../../models/Podcast.js"
import PodcastSerializer from "../../../serializers/PodcastSerializer.js"

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

export default podcastsRouter
