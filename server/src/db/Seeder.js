import { connection } from "../boot.js"
import reviewSeeder from "./seeders/reviewSeeder.js"
import genreSeeder from './seeders/genreSeeder.js'
import { User } from '../models/index.js' 
class Seeder {
  static async seed() {

    console.log("seeding users")
    await User.query().insert({
      email: 'test@test.com',
      cryptedPassword: 'hithere',
      username: 'test'
    })
    await User.query().insert({
      email: 'test2@test.com',
      cryptedPassword: 'hithere',
      username: 'test2'
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
