import express from "express"
import objection from "objection"
import Podcast from "../../../models/Podcast.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
const { ValidationError } = objection
const genrePodcastsRouter = new express.Router({ mergeParams: true })

genrePodcastsRouter.post("/", async (req, res) => {
  try {
    const { body } = req
    const formInput = cleanUserInput(body)
    const { name, description } = formInput
    const { genreId } = req.params

    const newPodcast = await Podcast.query().insertAndFetch({ name, description, genreId })
    return res.status(201).json({ podcast: newPodcast })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error })
  }
})
export default genrePodcastsRouter
