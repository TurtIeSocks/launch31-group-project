class GenreSerializer {
  static async getSummary(genre){
    const allowedAttributes = ["id", "name", "userId"]
    let serializedGenre = {}

    for (const attribute of allowedAttributes) {
      serializedGenre[attribute] = genre[attribute]
    }

      serializedGenre.podcasts = await genre.$relatedQuery("podcasts")
    return serializedGenre
  }
}

export default GenreSerializer