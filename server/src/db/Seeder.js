import { connection } from "../boot.js"
import reviewSeeder from "./seeders/reviewSeeder.js"
import genreSeeder from './seeders/genreSeeder.js'
import { User } from '../models/index.js' 
class Seeder {
  static async seed() {

    await User.query().insert({
      email: 'test@test.com',
      cryptedPassword: 'hithere',
      username: 'test'
    })

    console.log("seeding Genres & Podcasts")
    await genreSeeder.seed()

    console.log("seeding reviews")
    await reviewSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
