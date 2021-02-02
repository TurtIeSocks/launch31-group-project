import ReviewSerializer from "./ReviewSerializer.js"

class PodcastSerializer {
  static async getSummary(podcast) {
    const allowedAttributes = ["id", "name", "description", "genreId", "userId"]

    let serializedPodcast = {}

    for (const attribute of allowedAttributes) {
      serializedPodcast[attribute] = podcast[attribute]
    }

    let reviews = await podcast.$relatedQuery('reviews')
    serializedPodcast.reviews = await ReviewSerializer.getUser(reviews)
    return serializedPodcast
  }
}
export default PodcastSerializer
