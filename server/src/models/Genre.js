const Model = require("./Model.js")

class Genre extends Model {
  static get tableName() {
    return "genres"
  }
  static get relationMappings() {
    const Podcast = require('./Podcast.js')
    return {
      podcasts: {
        relation: Model.HasManyRelation,
        modelClass: Podcast,
        join: {
          from: "genres.id",
          to: "podcasts.genreId"
        }
      }
    }
  }
}

module.exports = Genre