import express from 'express'
import Genre from '../../../models/Genre.js'
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
    genre = await Genre.query().findById(id)
    genre.podcasts = await genre.$relatedQuery("podcasts")
    return res.status(200).json({genre: genre})
  } catch (error) {
    return res.status(500).json({error: error})
  }
})

export default genresRouter