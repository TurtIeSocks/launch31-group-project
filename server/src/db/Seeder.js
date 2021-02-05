import { connection } from "../boot.js"
import { Genre, User, Vote } from '../models/index.js'
class Seeder {
  static async seed() {

    console.log("seeding users")
    const user = await User.query().insertAndFetch({
      email: 'test@test.com',
      cryptedPassword: 'hithere',
      username: 'BigBoi'
    })
    const user2 = await User.query().insertAndFetch({
      email: 'test2@test.com',
      cryptedPassword: 'hithere',
      username: 'CrashBandicootFan'
    })

    console.log('seeding genres...')
    const comedy = await Genre.query().insertAndFetch({
      name: 'Comedy',
      userId: user.id,
      imageUrl: 'https://i.imgur.com/Wzd9ABV.png'
    })
    const trueCrime = await Genre.query().insertAndFetch({
      name: 'True Crime',
      userId: user.id,
      imageUrl: 'https://i.imgur.com/COZtGCR.png'
    })
    const news = await Genre.query().insertAndFetch({
      name: 'News',
      userId: user.id,
      imageUrl: 'https://i.imgur.com/T7DBKPX.png'
    })
    const horror = await Genre.query().insertAndFetch({
      name: 'Horror',
      userId: user.id,
      imageUrl: 'https://i.imgur.com/WqxPsPn.png'
    })
    const blues = await Genre.query().insertAndFetch({
      name: 'Blues',
      userId: user.id,
      imageUrl: 'https://i.imgur.com/s83ZWYJ.png'
    })
    const business = await Genre.query().insertAndFetch({
      name: 'Business',
      userId: user2.id,
      imageUrl: 'https://i.imgur.com/HkVpMA2.png'
    })
    const fiction = await Genre.query().insertAndFetch({
      name: 'Fiction',
      userId: user2.id,
      imageUrl: 'https://i.imgur.com/RujBwAk.png'
    })
    const music = await Genre.query().insertAndFetch({
      name: 'Music',
      userId: user2.id,
      imageUrl: 'https://i.imgur.com/LXOzDir.png'
    })
    const sports = await Genre.query().insertAndFetch({
      name: 'Sports',
      userId: user.id,
      imageUrl: 'https://i.imgur.com/Cbd55Kw.png'
    })
    const education = await Genre.query().insertAndFetch({
      name: 'Education',
      userId: user.id,
      imageUrl: 'https://i.imgur.com/w4me9iw.png'
    })
    const tv = await Genre.query().insertAndFetch({
      name: 'TV',
      userId: user.id,
      imageUrl: 'https://i.imgur.com/DaJjXxL.png'
    })
    const videoGames = await Genre.query().insertAndFetch({
      name: 'Video Games',
      userId: user2.id,
      imageUrl: 'https://i.imgur.com/MFBu0no.png'
    })

    console.log('seeding podcasts...')
    const dogGoesUp = await comedy.$relatedQuery('podcasts').insertAndFetch({
      name: 'Dog Goes Up',
      description: 'The dog goes on an adventure.',
      userId: user.id,
      genreId: comedy.id,
      imageUrl: 'https://i.imgur.com/1XwP1bL.png'
    })
    const catSolvesCrime = await trueCrime.$relatedQuery('podcasts').insertAndFetch({
      name: 'Cat solves crime',
      description: 'Detective Kerrin Meow solves murders.',
      userId: user.id,
      genreId: trueCrime.id,
      imageUrl: 'https://i.imgur.com/Fu05pOd.png'
    })
    const frogChamp = await news.$relatedQuery('podcasts').insertAndFetch({
      name: 'FrogChamp',
      description: 'Frog reports all the news.',
      userId: user.id,
      genreId: news.id,
      imageUrl: 'https://i.imgur.com/3SYZ68x.png'
    })
    const horseShow = await horror.$relatedQuery('podcasts').insertAndFetch({
      name: 'Horse Show',
      description: 'Horse goes down.',
      userId: user.id,
      genreId: horror.id,
      imageUrl: 'https://i.imgur.com/hEuAZjY.png'
    })
    const louisianaHistory = await blues.$relatedQuery('podcasts').insertAndFetch({
      name: 'Louisiana History',
      description: 'Deep dive into the history of the Blues genre.',
      userId: user2.id,
      genreId: blues.id,
      imageUrl: 'https://i.imgur.com/ZbyJAAB.png'
    })
    const interviewPrep = await business.$relatedQuery('podcasts').insertAndFetch({
      name: 'Alex\'s Interview Prep',
      description: 'Looking to get hired in the CS industry? Start here.',
      userId: user2.id,
      genreId: business.id,
      imageUrl: 'https://i.imgur.com/0wyrmZM.png'
    })
    const aWorldWhereEveryoneHasAJob = await fiction.$relatedQuery('podcasts').insertAndFetch({
      name: 'A World Where Everyone Has a Job',
      description: 'Can you imagine?',
      userId: user.id,
      genreId: news.id,
      imageUrl: 'https://i.imgur.com/0C7eZdD.png'
    })
    const edmFestivals = await music.$relatedQuery('podcasts').insertAndFetch({
      name: 'Are EDM Festivals Actually Fun?',
      description: 'Join us as we dive into the story of EDM festivals and how they turned into cash cows for the 1%.',
      userId: user.id,
      genreId: music.id,
      imageUrl: 'https://i.imgur.com/Q3CdxKF.png'
    })
    const sportBall = await sports.$relatedQuery('podcasts').insertAndFetch({
      name: 'Sport Ball',
      description: 'Yeah, sports are cool, for those that know about sports. Here we\'ll break down sports for those that don\'t actually care about watching sporting events but want to not feel left out at the next BBQ.',
      userId: user.id,
      genreId: sports.id,
      imageUrl: 'https://i.imgur.com/oBIJjK4.png'
    })
    const juniorTenYears = await business.$relatedQuery('podcasts').insertAndFetch({
      name: 'Junior Position Pay, 10 Years of Experience Required',
      description: 'We\'ve all seen it, lets talk about it.',
      userId: user2.id,
      genreId: business.id,
      imageUrl: 'https://i.imgur.com/oKF8a4Z.png'
    })
    const anime = await tv.$relatedQuery('podcasts').insertAndFetch({
      name: 'The Top Anime',
      description: 'Have 500 hours to burn? Are you into fight scenes that can last a whole season? Do you like only receiving 5 minutes of new content in a 20 minute episode? If so, check us out, we\'ve got some recommendations for you.',
      userId: user2.id,
      genreId: tv.id,
      imageUrl: 'https://i.imgur.com/eJkAHr2.png'
    })
    const overRatedGames = await videoGames.$relatedQuery('podcasts').insertAndFetch({
      name: 'Over Rated Games',
      description: 'Title says it all, we\'re here to tell you all about games that are way too hyped and not worth your time.',
      userId: user2.id,
      genreId: videoGames.id,
      imageUrl: 'https://i.imgur.com/A0p41l2.png'
    })
    const fangGang = await horror.$relatedQuery('podcasts').insertAndFetch({
      name: 'Fang Gang',
      description: 'A horror podcast called Fang Gang where immortal vampire Stephen Fang rides across the nation with his gang of goth bikers.',
      userId: user2.id,
      genreId: horror.id,
      imageUrl: 'https://i.imgur.com/PgMo3y4.png'
    })
    const imperialMajesty = await news.$relatedQuery('podcasts').insertAndFetch({
      name: 'His Imperial Majesty',
      description: 'A news podcast called His Imperial Majesty where Emperor Nick Alberts reviews the latest in student apps and rates them on a scale from small to too small.',
      userId: user2.id,
      genreId: news.id,
      imageUrl: 'https://i.imgur.com/MPs1U49.png'
    })
    const briannaDesk = await education.$relatedQuery('podcasts').insertAndFetch({
      name: 'Brianna\'s Desk ',
      description: 'The legend herself, Brianna, shares her knowledge of everything to us in a straightforward, easy to understand, manner.',
      userId: user2.id,
      genreId: education.id,
      imageUrl: 'https://i.imgur.com/LHHec2E.png'
    })

    console.log('seeding votes...')
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

    console.log("seeding reviews...")
    await dogGoesUp.$relatedQuery('reviews').insert({
      description: "I can't believe how up this dog went it was amazing!!! Wowewwwewewewwwweeeee",
      rating: "★ ★ ★ ★ ★",
      userId: user.id
    })
    await catSolvesCrime.$relatedQuery('reviews').insert({
      description: "ON THE EDGE OF MY SEAT",
      rating: "★ ★ ★ ★",
      userId: user.id
    })
    await frogChamp.$relatedQuery('reviews').insert({
      description: "THE CHAMP",
      rating: "★ ★ ★",
      userId: user.id
    })
    await horseShow.$relatedQuery('reviews').insert({
      description: "Yeah, pass",
      rating: "★",
      userId: user.id
    })
    await louisianaHistory.$relatedQuery('reviews').insert({
      description: "Interesting, but not for me.",
      rating: "★ ★",
      userId: user.id
    })
    await interviewPrep.$relatedQuery('reviews').insert({
      description: "Do it.",
      rating: "★ ★ ★ ★ ★",
      userId: user.id
    })
    await aWorldWhereEveryoneHasAJob.$relatedQuery('reviews').insert({
      description: "Oof.",
      rating: "★ ★",
      userId: user.id
    })
    await edmFestivals.$relatedQuery('reviews').insert({
      description: "Accurate but not interesting.",
      rating: "★",
      userId: user.id
    })
    await sportBall.$relatedQuery('reviews').insert({
      description: "lol.",
      rating: "★ ★",
      userId: user.id
    })
    await juniorTenYears.$relatedQuery('reviews').insert({
      description: "Too relatable.",
      rating: "★",
      userId: user.id
    })
    await anime.$relatedQuery('reviews').insert({
      description: "Yes, give me more ways to waste my time.",
      rating: "★ ★ ★ ★",
      userId: user.id
    })
    await overRatedGames.$relatedQuery('reviews').insert({
      description: "Hosts are a little stuck up.",
      rating: "★ ★ ★",
      userId: user.id
    })
    await fangGang.$relatedQuery('reviews').insert({
      description: "FANG GANG, WHERE CAN I SIGN UP!?",
      rating: "★ ★ ★ ★ ★",
      userId: user.id
    })
    await imperialMajesty.$relatedQuery('reviews').insert({
      description: "Who is Nick!",
      rating: "★ ★ ★ ★ ★",
      userId: user.id
    })
    await briannaDesk.$relatedQuery('reviews').insert({
      description: "Informative as hell.",
      rating: "★ ★ ★ ★ ★",
      userId: user.id
    })

    await dogGoesUp.$relatedQuery('reviews').insert({
      description: "Top notch quality",
      rating: "★ ★ ★ ★",
      userId: user2.id
    })
    await catSolvesCrime.$relatedQuery('reviews').insert({
      description: "Hmm, not sold on this one.",
      rating: "★ ★",
      userId: user2.id
    })
    await frogChamp.$relatedQuery('reviews').insert({
      description: "F R O G | C H A M P",
      rating: "★ ★ ★",
      userId: user2.id
    })
    await horseShow.$relatedQuery('reviews').insert({
      description: "If you like horses, stay away.",
      rating: "★ ★ ★",
      userId: user2.id
    })
    await louisianaHistory.$relatedQuery('reviews').insert({
      description: "Informative but the host is kind of boring.",
      rating: "★ ★ ★",
      userId: user2.id
    })
    await interviewPrep.$relatedQuery('reviews').insert({
      description: "Highly recommend everyone to listen.",
      rating: "★ ★ ★ ★ ★",
      userId: user2.id
    })
    await aWorldWhereEveryoneHasAJob.$relatedQuery('reviews').insert({
      description: "Scary",
      rating: "★ ★ ★ ★",
      userId: user2.id
    })
    await edmFestivals.$relatedQuery('reviews').insert({
      description: "uh huh.",
      rating: "★ ★",
      userId: user2.id
    })
    await sportBall.$relatedQuery('reviews').insert({
      description: "Thank you for the informative summaries so I don't have to actually watch.",
      rating: "★ ★ ★ ★",
      userId: user2.id
    })
    await juniorTenYears.$relatedQuery('reviews').insert({
      description: "An actual nightmare, relived in my ears. Thanks.",
      rating: "★ ★ ★",
      userId: user2.id
    })
    await anime.$relatedQuery('reviews').insert({
      description: "So what if I like fight scenes that need a whole season??",
      rating: "★ ★ ★",
      userId: user2.id
    })
    await overRatedGames.$relatedQuery('reviews').insert({
      description: "I feel personally attacked.",
      rating: "★",
      userId: user2.id
    })
    await fangGang.$relatedQuery('reviews').insert({
      description: "Bro, I'm also looking for the Fang Gang signup sheet.",
      rating: "★ ★ ★ ★ ★",
      userId: user2.id
    })
    await imperialMajesty.$relatedQuery('reviews').insert({
      description: "NICK, CAN I HAVE YOUR AUTOGRAPH??",
      rating: "★ ★ ★ ★ ★",
      userId: user2.id
    })
    await briannaDesk.$relatedQuery('reviews').insert({
      description: "I send this Podcast to everyone!",
      rating: "★ ★ ★ ★ ★",
      userId: user2.id
    })

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
