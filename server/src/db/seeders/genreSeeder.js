import { Genre } from "../../models/index.js"

class genreSeeder{
  static async seed() {

    await Genre.query().insert({ name: 'Comedy'})
    await Genre.query().insert({ name: 'True Crime'})
    await Genre.query().insert({ name: 'News'})
    await Genre.query().insert({ name: 'Horror'})
  }
}

export default genreSeeder