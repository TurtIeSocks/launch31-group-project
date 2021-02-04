import { Genre, User, Vote } from "../../models/index.js"

class genreSeeder {
  static async seed() {

    const user = await User.query().findById(1)
    const user2 = await User.query().findById(2)

    const comedy = await Genre.query().insertAndFetch({ name: 'Comedy', userId: user.id })
    const trueCrime = await Genre.query().insertAndFetch({ name: 'True Crime', userId: user.id })
    const news = await Genre.query().insertAndFetch({ name: 'News', userId: user.id })
    const horror = await Genre.query().insertAndFetch({ name: 'Horror', userId: user.id })
    const blues = await Genre.query().insertAndFetch({ name: 'Blues', userId: user.id })
    const business = await Genre.query().insertAndFetch({ name: 'Business', userId: user.id })
    const fiction = await Genre.query().insertAndFetch({ name: 'Fiction', userId: user.id })
    const music = await Genre.query().insertAndFetch({ name: 'Music', userId: user.id })
    const sports = await Genre.query().insertAndFetch({ name: 'Sports', userId: user.id })
    const education = await Genre.query().insertAndFetch({ name: 'Education', userId: user.id })
    const tv = await Genre.query().insertAndFetch({ name: 'TV', userId: user.id })
    const videoGames = await Genre.query().insertAndFetch({ name: 'Video Games', userId: user.id })

    const dogGoesUp = await comedy.$relatedQuery('podcasts').insertAndFetch({
      name: 'Dog Goes Up',
      description: 'The dog goes on an adventure.',
      userId: user.id,
      genreId: comedy.id
    })
    const catSolvesCrime = await trueCrime.$relatedQuery('podcasts').insertAndFetch({
      name: 'Cat solves crime',
      description: 'Detective Kerrin Meow solves murders.',
      userId: user.id,
      genreId: trueCrime.id
    })
    const frogChamp = await news.$relatedQuery('podcasts').insertAndFetch({
      name: 'FrogChamp',
      description: 'Frog report all the news.',
      userId: user.id,
      genreId: news.id
    })
    const horseShow = await horror.$relatedQuery('podcasts').insertAndFetch({
      name: 'Horse Show',
      description: 'Horse goes down.',
      userId: user.id,
      genreId: horror.id
    })
    const louisianaHistory = await blues.$relatedQuery('podcasts').insertAndFetch({
      name: 'Louisiana History',
      description: 'Deep dive into the history of the Blues genre.',
      userId: user2.id,
      genreId: blues.id
    })
    const interviewPrep = await business.$relatedQuery('podcasts').insertAndFetch({
      name: 'Alex\'s Interview Prep',
      description: 'Looking to get hired in the CS industry? Start here.',
      userId: user2.id,
      genreId: business.id
    })
    const aWorldWhereEveryoneHasAJob = await fiction.$relatedQuery('podcasts').insertAndFetch({
      name: 'A World Where Everyone Has a Job',
      description: 'Frog report all the news',
      userId: user.id,
      genreId: news.id
    })
    const edmFestivals = await music.$relatedQuery('podcasts').insertAndFetch({
      name: 'Are EDM Festivals Actually Fun?',
      description: 'Join us as we dive into the story of EDM festivals and how they turned into cash cows for the 1%.',
      userId: user.id,
      genreId: music.id
    })
    const sportBall = await sports.$relatedQuery('podcasts').insertAndFetch({
      name: 'Sport Ball',
      description: 'Yeah, sports are cool, for those that know about sports. Here we\'ll break down sports for those that don\'t actually care about watching sporting events but want to not feel left out at the next BBQ.',
      userId: user.id,
      genreId: sports.id
    })
    const juniorTenYears = await business.$relatedQuery('podcasts').insertAndFetch({
      name: 'Junior Position Pay, 10 Years of Experience Required',
      description: 'We\'ve all seen it, lets talk about it.',
      userId: user2.id,
      genreId: business.id
    })
    const anime = await tv.$relatedQuery('podcasts').insertAndFetch({
      name: 'The Top Anime',
      description: 'Have 500 hours to burn? Are you into fight scenes that can last a whole season? Do you like only receiving 5 minutes of new content in a 20 minute episode? If so, check us out, we\'ve got some recommendations for you.',
      userId: user2.id,
      genreId: tv.id
    })
    const overRatedGames = await videoGames.$relatedQuery('podcasts').insertAndFetch({
      name: 'Over Rated Games',
      description: 'Title says it all, we\'re here to tell you all about games that are way too hyped and not worth your time.',
      userId: user2.id,
      genreId: videoGames.id
    })
    const fangGang = await horror.$relatedQuery('podcasts').insertAndFetch({
      name: 'Fang Gang',
      description: 'A horror podcast called Fang Gang where immortal vampire Stephen Fang rides across the nation with his gang of goth bikers.',
      userId: user2.id,
      genreId: horror.id
    })
    const imperialMajesty = await news.$relatedQuery('podcasts').insertAndFetch({
      name: 'His Imperial Majesty',
      description: 'A news podcast called His Imperial Majesty where Emperor Nick Alberts reviews the latest in student apps and rates them on a scale from small to too small.',
      userId: user2.id,
      genreId: news.id
    })
    const briannaDesk = await education.$relatedQuery('podcasts').insertAndFetch({
      name: 'Brianna\'s Desk ',
      description: 'The legend herself, Brianna, shares her knowledge of everything to us in a straightforward, easy to understand, manner.',
      userId: user2.id,
      genreId: education.id
    })

    await Vote.query().insert({ podcastId: dogGoesUp.id, userId: user.id, value: -1 })
    await Vote.query().insert({ podcastId: catSolvesCrime.id, userId: user.id, value: 0 })
    await Vote.query().insert({ podcastId: frogChamp.id, userId: user.id, value: 1 })
    await Vote.query().insert({ podcastId: horseShow.id, userId: user.id, value: 1 })
    await Vote.query().insert({ podcastId: louisianaHistory.id, userId: user.id, value: -1 })
    await Vote.query().insert({ podcastId: interviewPrep.id, userId: user.id, value: 1 })
    await Vote.query().insert({ podcastId: aWorldWhereEveryoneHasAJob.id, userId: user.id, value: -1 })
    await Vote.query().insert({ podcastId: edmFestivals.id, userId: user.id, value: 1 })
    await Vote.query().insert({ podcastId: sportBall.id, userId: user.id, value: -1 })
    await Vote.query().insert({ podcastId: juniorTenYears.id, userId: user.id, value: 1 })
    await Vote.query().insert({ podcastId: anime.id, userId: user.id, value: -1 })
    await Vote.query().insert({ podcastId: overRatedGames.id, userId: user.id, value: 0 })
    await Vote.query().insert({ podcastId: fangGang.id, userId: user.id, value: 1 })
    await Vote.query().insert({ podcastId: imperialMajesty.id, userId: user.id, value: 1 })
    await Vote.query().insert({ podcastId: briannaDesk.id, userId: user.id, value: 1 })

    await Vote.query().insert({ podcastId: dogGoesUp.id, userId: user2.id, value: -1 })
    await Vote.query().insert({ podcastId: catSolvesCrime.id, userId: user2.id, value: 1 })
    await Vote.query().insert({ podcastId: frogChamp.id, userId: user2.id, value: 0 })
    await Vote.query().insert({ podcastId: horseShow.id, userId: user2.id, value: 1 })
    await Vote.query().insert({ podcastId: louisianaHistory.id, userId: user2.id, value: 0 })
    await Vote.query().insert({ podcastId: interviewPrep.id, userId: user2.id, value: 1 })
    await Vote.query().insert({ podcastId: aWorldWhereEveryoneHasAJob.id, userId: user2.id, value: -1 })
    await Vote.query().insert({ podcastId: edmFestivals.id, userId: user2.id, value: 0 })
    await Vote.query().insert({ podcastId: sportBall.id, userId: user2.id, value: 1 })
    await Vote.query().insert({ podcastId: juniorTenYears.id, userId: user2.id, value: 1 })
    await Vote.query().insert({ podcastId: anime.id, userId: user2.id, value: 0 })
    await Vote.query().insert({ podcastId: overRatedGames.id, userId: user2.id, value: 1 })
    await Vote.query().insert({ podcastId: fangGang.id, userId: user2.id, value: 1 })
    await Vote.query().insert({ podcastId: imperialMajesty.id, userId: user2.id, value: 1 })
    await Vote.query().insert({ podcastId: briannaDesk.id, userId: user2.id, value: 1 })
  }
}

export default genreSeeder