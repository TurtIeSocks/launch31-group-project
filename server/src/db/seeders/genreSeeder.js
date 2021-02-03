import { Genre, User, Vote } from "../../models/index.js"

class genreSeeder {
  static async seed() {

    const user = await User.query().findById(1)
    const user2 = await User.query().findById(2)
    const comedy = await Genre.query().insertAndFetch({ name: 'Comedy', userId: user.id })
    const trueCrime = await Genre.query().insertAndFetch({ name: 'True Crime', userId: user.id })
    const news = await Genre.query().insertAndFetch({ name: 'News', userId: user.id })
    const horror = await Genre.query().insertAndFetch({ name: 'Horror', userId: user.id })

    const dogGoesUp = await comedy.$relatedQuery('podcasts').insertAndFetch({
      name: 'Dog Goes Up',
      description: 'The dog goes on an adventure',
      userId: user.id,
      genreId: comedy.id
    })
    const catSolvesCrime = await trueCrime.$relatedQuery('podcasts').insertAndFetch({
      name: 'Cat solves crime',
      description: 'Detective Kerrin Meow solves murders',
      userId: user.id,
      genreId: trueCrime.id
    })
    const frogChamp = await news.$relatedQuery('podcasts').insertAndFetch({
      name: 'FrogChamp',
      description: 'Frog report all the news',
      userId: user.id,
      genreId: news.id
    })
    const horseShow = await horror.$relatedQuery('podcasts').insertAndFetch({
      name: 'Horse Show',
      description: 'Horse goes down.',
      userId: user.id,
      genreId: horror.id
    })

    await Vote.query().insert({ podcastId: dogGoesUp.id, userId: user.id, value: -1})
    await Vote.query().insert({ podcastId: catSolvesCrime.id, userId: user.id, value: 0})
    await Vote.query().insert({ podcastId: frogChamp.id, userId: user.id, value: 1})
    await Vote.query().insert({ podcastId: dogGoesUp.id, userId: user2.id, value: -1})
    await Vote.query().insert({ podcastId: horseShow.id, userId: user2.id, value: 1})

  }
}

export default genreSeeder