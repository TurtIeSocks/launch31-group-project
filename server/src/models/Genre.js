const Model = require("./Model.js")

class Genre extends Model {
  static get tableName() {
    return "genres"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", minLength: 1 },
        userId: { type: ["string, integer"]}
      }
    }
  }
  
  static get relationMappings() {
    const { Podcast, User } = require('./index.js')

    return {
      podcasts: {
        relation: Model.HasManyRelation,
        modelClass: Podcast,
        join: {
          from: "genres.id",
          to: "podcasts.genreId"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "genres.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Genre