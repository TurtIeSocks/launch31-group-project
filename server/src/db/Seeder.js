import { connection } from "../boot.js";
import PodcastSeeder from "./seeders/PodcastSeeder.js";
class Seeder {
  static async seed() {
    console.log("Seeding podcasts...");
    await PodcastSeeder.seed();

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
