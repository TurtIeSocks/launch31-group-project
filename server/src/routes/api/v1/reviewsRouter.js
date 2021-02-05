import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Review } from "../../../models/index.js"
import ReviewSerializer from "../../../serializers/ReviewSerializer.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const reviewsRouter = new express.Router()

reviewsRouter.get("/", async (req, res) => {
  try {
    const reviews = await Review.query()

    const serializedReviews = []

    for (const review of reviews) {
      const serializedReview = await ReviewSerializer.getSummary(review)
      serializedReviews.push(serializedReview)
    }
    
    res.status(200).json({ reviews: serializedReviews })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

reviewsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    
    const review = await Review.query().findById(id)
    const serializedReview = await ReviewSerializer.getSummary(review)
    res.status(200).json({ review: serializedReview })
  } catch (err) {
    res.status(500).json({ errors: err })
  }
})

reviewsRouter.patch("/:id", async (req, res) => {
  try {
    const { body } = req
    const formInput = cleanUserInput(body)
    const { description, rating } = formInput
    const { id }  = req.params
    
    await Review.query()
      .findById(id)
      .update({ description, rating })
    return res.status(201).json()
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error })
  }
})

reviewsRouter.delete("/:id", async (req, res) => {
  try {
    const { id }  = req.params
    
    await Review.query()
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

export default reviewsRouter
