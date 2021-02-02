import { Genre, User } from "../../models/index.js"

class genreSeeder{
  static async seed() {

    const user = await User.query().findById(1)

    const comedy = await Genre.query().insert({ name: 'Comedy', userId: user.id})
    const trueCrime = await Genre.query().insert({ name: 'True Crime', userId: user.id})
    const news = await Genre.query().insert({ name: 'News', userId: user.id})
    const horror = await Genre.query().insert({ name: 'Horror', userId: user.id})

    await comedy.$relatedQuery('podcasts').insert({
      name: 'Dog Goes Up',
      description: 'The dog goes on an adventure',
      userId: user.id
    })
    await trueCrime.$relatedQuery('podcasts').insert({
      name: 'Cat solves crime',
      description: 'Detective Kerrin Meow solves murders',
      userId: user.id 
    })
    await news.$relatedQuery('podcasts').insert({
      name: 'FrogChamp',
      description: 'Frog report all the news',
      userId: user.id
    })
    await horror.$relatedQuery('podcasts').insert({
      name: 'Horse Show',
      description: 'Horse goes down.',
      userId: user.id
    })
  }
}

export default genreSeeder