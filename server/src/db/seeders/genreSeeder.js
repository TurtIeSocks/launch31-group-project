import { Genre } from "../../models/index.js"

class genreSeeder{
  static async seed() {

    const comedy = await Genre.query().insert({ name: 'Comedy'})
    const trueCrime = await Genre.query().insert({ name: 'True Crime'})
    const news = await Genre.query().insert({ name: 'News'})
    const horror = await Genre.query().insert({ name: 'Horror'})

    await comedy.$relatedQuery('podcasts').insert({
      name: 'Dog Goes Up',
      description: 'The dog goes on an adventure'
    })
    await trueCrime.$relatedQuery('podcasts').insert({
      name: 'Cat solves crime',
      description: 'Detective Kerrin Meow solves murders'
    })
    await news.$relatedQuery('podcasts').insert({
      name: 'FrogChamp',
      description: 'Frog report all the news'
    })
    await horror.$relatedQuery('podcasts').insert({
      name: 'Horse Show',
      description: 'Horse goes down.'
    })
  }
}

export default genreSeeder