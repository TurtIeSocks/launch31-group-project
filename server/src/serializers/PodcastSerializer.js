class PodcastSerializer {
  static async getSummary(podcast) {
    const allowedAttributes = ["id", "name", "description"]

    let serializedPodcast = {}

    for (const attribute of allowedAttributes) {
      serializedPodcast[attribute] = podcast[attribute]
    }
    serializedPodcast.reviews = await podcast.$relatedQuery('reviews')
    
    return serializedPodcast
  }
}
export default PodcastSerializer
