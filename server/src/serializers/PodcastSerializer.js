import ReviewSerializer from "./ReviewSerializer.js"

class PodcastSerializer {
  static async getSummary(podcast) {
    const allowedAttributes = ["id", "name", "description"]

    let serializedPodcast = {}

    for (const attribute of allowedAttributes) {
      serializedPodcast[attribute] = podcast[attribute]
    }

    let reviews = await podcast.$relatedQuery('reviews')
    serializedPodcast.reviews = await ReviewSerializer.updateData(reviews)
    return serializedPodcast
  }
}
export default PodcastSerializer
