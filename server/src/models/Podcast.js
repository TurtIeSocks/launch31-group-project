const Model = require("./Model")

class Podcast extends Model {
  static get tableName() {
    return "podcasts"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", minLength: 1 },
        description: { type: "string" }
      }
    }
  }

  static get relationMappings() {
    const Genre = require("./Genre.js")
    return {
      genre: {
        relation: Model.BelongsToOneRelation,
        modelClass: Genre,
        join: {
          from: "podcasts.genreId",
          to: "genres.id"
        }
      }
    }
  }
}

module.exports = Podcast
