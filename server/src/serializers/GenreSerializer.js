import PodcastSerializer from './PodcastSerializer.js'
class GenreSerializer {
  static async getSummary(genre){
    const allowedAttributes = ["id", "name", "userId", "imageUrl"]
    let serializedGenre = {}

    for (const attribute of allowedAttributes) {
      serializedGenre[attribute] = genre[attribute]
    }

    const podcasts = await genre.$relatedQuery("podcasts")
    
    serializedGenre.podcasts = await PodcastSerializer.getPodcasts(podcasts)

    return serializedGenre
  }
}

export default GenreSerializer