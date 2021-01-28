import { Review, Podcast } from "../../models/index.js"

class reviewSeeder {
  static async seed() {
    const dogGoesUp = await Podcast.query().findById(1)

    await dogGoesUp.$relatedQuery('reviews').insert({
      description: "I can't believe how up this dog went it was amazing!!! Wowewwwewewewwwweeeee",
      rating: "★ ★ ★ ★ ★"
    })
  }
}

export default reviewSeeder