class PodcastSerializer {
  static getSummary(podcast) {
    const allowedAttributes = ["id", "name", "description", "reviews"]

    let serializedPodcast = {}

    for (const attribute of allowedAttributes) {
      serializedPodcast[attribute] = podcast[attribute]
    }
    return serializedPodcast
  }
}
export default PodcastSerializer
