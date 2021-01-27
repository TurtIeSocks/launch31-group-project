import { connection } from "../boot.js"
import PodcastSeeder from "./seeders/PodcastSeeder.js"
import genreSeeder from './seeders/genreSeeder.js'
class Seeder {
  static async seed() {
    console.log("seeding Genres")
    await genreSeeder.seed()

    console.log("Seeding podcasts...")
    await PodcastSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder