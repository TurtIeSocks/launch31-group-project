import ReviewSerializer from "./ReviewSerializer.js"
import VoteSerializer from "./VoteSerializer.js"
import { Vote } from '../models/index.js'

class PodcastSerializer {
  static async getSummary(podcast) {
    const allowedAttributes = ["id", "name", "description", "genreId", "userId", "imageUrl"]

    let serializedPodcast = {}

    for (const attribute of allowedAttributes) {
      serializedPodcast[attribute] = podcast[attribute]
    }

    let reviews = await podcast.$relatedQuery('reviews')
    serializedPodcast.reviews = await ReviewSerializer.getUser(reviews)

    let userVotes = await Vote.query()
      .where({ podcastId: serializedPodcast.id })

    serializedPodcast.userVotes = await VoteSerializer.getVotes(userVotes)

    serializedPodcast.totalVotes = await Vote.query()
      .where('podcastId', serializedPodcast.id)
      .sum('value as value')
      .first()

    return serializedPodcast
  }

  static async getPodcasts(podcasts) {
    return await Promise.all(podcasts.map(async podcast => {
      const serializedPodcast = await PodcastSerializer.getSummary(podcast)
      
      return serializedPodcast
    }))
  }
}
export default PodcastSerializer
