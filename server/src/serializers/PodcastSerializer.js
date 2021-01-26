class PodcastSerializer {
  static getSummary(podcast) {
    const allowedAttributes = ["id", "name", "description"];

    let serializedPodcast = {};

    for (const attribute of allowedAttributes) {
      serializedPodcast[attribute] = podcast[attribute];
    }
    return serializedPodcast;
  }
}
export default PodcastSerializer;
