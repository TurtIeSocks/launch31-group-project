import { Podcast } from "../../models/index.js"

class PodcastSeeder{
  static async seed() {
    const podcastData = [
      { 
        name: "MBMBAM",
        description: "An advice show for the modern era.",
        genreId: 2
      },
      { 
        name: "Serial",
        description: "One story told week by week",
        genreId: 1
      },
      {
        name: "The Daily",
        description: "I'm Michael Barbaro.",
        genreId: 3
      },
      {
        name: "Welcome to Nightvale",
        description: "I'm Cecil Baldwin.",
        genreId: 4
      }
    ]

    for (const currentPodcast of podcastData) {
      const podcastRecord = await Genre.query().findOne({name: currentPodcast.name})
      if (!podcastRecord) {
        await Podcast.query().insert(currentGenre)
      }
    }
  }
}

export default PodcastSeeder