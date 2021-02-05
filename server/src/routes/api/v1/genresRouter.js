import express from "express"
import objection from "objection"
const { ValidationError } = objection
import { Genre, Podcast } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import GenreSerializer from "../../../serializers/GenreSerializer.js"

const genresRouter = new express.Router()

genresRouter.get("/", async (req, res) => {
  try {
    const genres = await Genre.query()
    const serializedGenres = []

    for (const genre of genres) {
      const serializedGenre = await GenreSerializer.getSummary(genre)
      serializedGenres.push(serializedGenre)
    }
    return res.status(200).json({ genres: serializedGenres })
  } catch (error) {
    return res.status(500).json({ error: error })
  }
})

genresRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const genre = await Genre.query().findById(id)
    const serializedGenre = await GenreSerializer.getSummary(genre)

    return res.status(200).json({ genre: serializedGenre })
  } catch (error) {
    return res.status(500).json({ error: error })
  }
})

genresRouter.post("/", async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  const { name, imageUrl } = formInput
  const userId = req.user.id

  try {
    const newGenre = await Genre.query().insertAndFetch({ name, userId, imageUrl })
    const serializedGenre = await GenreSerializer.getSummary(newGenre)
    return res.status(200).json({ genre: serializedGenre })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

genresRouter.patch("/:id", async (req, res) => {
  try {
    const { body } = req
    const formInput = cleanUserInput(body)
    const { name, imageUrl } = formInput
    const { id } = req.params
    
    await Genre.query()
      .findById(id)
      .update({ name, imageUrl })
    return res.status(201).json()
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error })
  }
})

genresRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    await Podcast.query()
      .where('genreId', id)
      .delete()
    await Genre.query()
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

export default genresRouter
