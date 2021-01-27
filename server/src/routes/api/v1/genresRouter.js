import express from 'express'
import objection from 'objection'
const { ValidationError } = objection

import { Genre } from '../../../models/index.js'
import cleanUserInput from "../../../services/cleanUserInput.js"

const genresRouter = new express.Router()

genresRouter.get('/', async (req, res)=> {
  try {
    const genres = await Genre.query()
    return res.status(200).json({genres: genres})
  } catch (error) {
    return res.status(500).json({error: error})
  }
})

genresRouter.get('/:id', async (req, res)=> {
  try {
    const {id} = req.params
    const genre = await Genre.query().findById(id)
    genre.podcasts = await genre.$relatedQuery("podcasts")
    return res.status(200).json({genre: genre})
  } catch (error) {
    return res.status(500).json({error: error})
  }
})

genresRouter.post("/", async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  try {
    const newGenre = await Genre.query().insertAndFetch(formInput)
    return res.status(200).json({ genre: newGenre })
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default genresRouter 
