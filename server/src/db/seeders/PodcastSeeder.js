import { Podcast } from "../../models/index.js";

class PodcastSeeder {
  static async seed() {
    const podcastData = [
      {
        name: "MBMBAM",
        description: "An advice show for the modern era.",
      },
      {
        name: "Serial",
        description: "One story told week by week",
      },
      {
        name: "The Daily",
        description: "I'm Michael Barbaro.",
      },
      {
        name: "Welcome to Nightvale",
        description: "I'm Cecil Baldwin.",
      },
    ];

    for (const currentPodcast of podcastData) {
      const podcastRecord = await Podcast.query().findOne({ name: currentPodcast.name });
      if (!podcastRecord) {
        await Podcast.query().insert(currentPodcast);
      }
    }
  }
}

export default PodcastSeeder;
