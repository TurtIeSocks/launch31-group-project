import express from 'express'
import objection from 'objection'
const { ValidationError } = objection

import { Vote } from '../../../models/index.js'
import VoteSerializer from '../../../serializers/VoteSerializer.js'

const podcastVotesRouter = new express.Router({ mergeParams: true })

podcastVotesRouter.get('/', async (req, res) => {
  const { podcastId } = req.params
  let userId
  if (req.user) userId = req.user.id

  try {
    let votes = {}
    votes.userVotes = await Vote.query()
      .where('podcastId', podcastId)
      .andWhere('userId', userId)
      .first()
    votes.totalVotes = await Vote.query()
      .where('podcastId', podcastId)
      .sum('value as value')
      .first()
    return res.status(201).json({ votes: votes })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

podcastVotesRouter.post('/', async (req, res) => {
  const { value } = req.body
  const { podcastId } = req.params
  const userId = req.user.id

  try {
    let newVote = {}
    newVote.userVotes = await Vote.query()
      .insert({ podcastId, userId, value })
      .first()
      .returning('*')
    newVote.totalVotes = await Vote.query()
      .where('podcastId', podcastId)
      .sum('value as value')
      .first()
    return res.status(201).json({ votes: newVote })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

podcastVotesRouter.patch('/', async (req, res) => {
  const { value } = req.body
  const { podcastId } = req.params
  const userId = req.user.id

  try {
    let editVote = {}
    editVote.userVotes = await Vote.query()
      .update({ value: value })
      .where('podcastId', podcastId)
      .andWhere('userId', userId)
      .first()
      .returning('*')
    editVote.totalVotes = await Vote.query()
      .where('podcastId', podcastId)
      .sum('value as value')
      .first()
    return res.status(201).json({ votes: editVote })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

podcastVotesRouter.delete('/', async (req, res) => {
  const { podcastId } = req.params
  const userId = req.user.id

  try {
    let deletedVote = {}
    deletedVote.userVotes = await Vote.query().delete()
      .where('podcastId', podcastId)
      .andWhere('userId', userId)
    deletedVote.totalVotes = await Vote.query()
      .where('podcastId', podcastId)
      .sum('value as value')
      .first()
    return res.status(201).json({ votes: deletedVote })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})



export default podcastVotesRouter