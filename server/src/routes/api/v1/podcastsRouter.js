import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Podcast } from "../../../models/index.js"
import PodcastSerializer from "../../../serializers/PodcastSerializer.js"
import podcastReviewsRouter from './podcastReviewsRouter.js' 
import podcastVotesRouter from './podcastVotesRouter.js' 
import cleanUserInput from "../../../services/cleanUserInput.js"

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

podcastsRouter.post("/", async (req, res) => {
  try {
    const { body } = req
    const formInput = cleanUserInput(body)
    const { name, description, genreId, imageUrl } = formInput
    const userId = req.user.id 
    
    const newPodcast = await Podcast.query()
      .insert({ name, description, genreId, userId, imageUrl })
      .returning('*')
    return res.status(201).json({ podcast: newPodcast })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error })
  }
})

podcastsRouter.patch("/:id", async (req, res) => {
  try {
    const { body } = req
    const formInput = cleanUserInput(body)
    const { name, description, genreId, imageUrl } = formInput
    const { id }  = req.params
    
    await Podcast.query()
      .findById(id)
      .update({ name, description, genreId, imageUrl })
    return res.status(201).json()
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error })
  }
})

podcastsRouter.delete("/:id", async (req, res) => {
  try {
    const { id }  = req.params
    
    await Podcast.query()
      .findById(id)
      .delete()
    return res.status(201).json()
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error })
  }
})

podcastsRouter.use("/:podcastId/reviews", podcastReviewsRouter)

podcastsRouter.use("/:podcastId/votes", podcastVotesRouter)

export default podcastsRouter
