import express from 'express' 
import objection from 'objection'
const { ValidationError } = objection

import { Review } from '../../../models/index.js' 
import cleanUserInput from '../../../services/cleanUserInput.js' 

const podcastReviewsRouter = new express.Router({ mergeParams: true })

podcastReviewsRouter.post('/', async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  const { description, rating } = formInput
  const { podcastId } = req.params

  try {
    const newReview = await Review.query().insertAndFetch({
      description, rating, podcastId
    })
    return res.status(201).json({ review: newReview })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error})
  }
})

export default podcastReviewsRouter