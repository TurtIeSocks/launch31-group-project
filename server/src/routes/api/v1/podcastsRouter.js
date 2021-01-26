import express from 'express'

import Podcast from '../../../models/Podcast.js'

const podcastsRouter = new express.Router()

podcastsRouter.get('/', async (req, res)=> {
  try {
    const podcasts = await Podcast.query()
    res.status(200).json({podcasts: podcasts})
  } catch (error) {
    res.status(500).json({error: error})
  }
})

podcastsRouter.get('/:id', async (req, res)=> {
  const {id} = req.params
  try {
    podcast = await Podcast.query().findById(id)
    podcast.reviews = await podcast.$relatedQuery("reviews")
    res.status(200).json({podcast: podcast})
  } catch (error) {
    return res.status(500).json({ error: error })
  }
})

export default podcastsRouter