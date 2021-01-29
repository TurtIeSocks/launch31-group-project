import { connection } from "../boot.js"
import reviewSeeder from "./seeders/reviewSeeder.js"
import genreSeeder from './seeders/genreSeeder.js'
class Seeder {
  static async seed() {
    console.log("seeding Genres & Podcasts")
    await genreSeeder.seed()

    console.log("seeding reviews")
    await reviewSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder