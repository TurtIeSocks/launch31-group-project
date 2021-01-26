import { Genre } from "../../models/index.js"

class GenreSeeder{
  static async seed() {
    const genreData = [
      {
        name: "True Crime"
      },
      {
        name: "Comedy"
      },
      {
        name: "News"
      },
      {
        name: "Horror"
      }
    ]

    for (const currentGenre of genreData) {
      const genreRecord = await Genre.query().findOne({name: currentGenre.name})
      if (!genreRecord) {
        await Genre.query().insert(currentGenre)
      }
    }
  }
}

export default GenreSeeder