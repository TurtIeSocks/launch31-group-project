const Model = require("./Model")

class Podcast extends Model {
  static get tableName() {
    return "podcasts"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "genreId"],
      properties: {
        name: { type: "string", minLength: 1 },
        description: { type: "string" },
        genreId: { type: ["string", "integer"] },
        userId: { type: ["string, integer"] },
        votes: { type: ["string, integer"] }
      }
    }
  }

  static get relationMappings() {
    const { Genre, Review, User, Vote } = require("./index.js")

    return {
      genre: {
        relation: Model.BelongsToOneRelation,
        modelClass: Genre,
        join: {
          from: "podcasts.genreId",
          to: "genres.id"
        }
      },
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "podcasts.id",
          to: "reviews.podcastId"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "podcasts.userId",
          to: "users.id"
        }
      },
      votes: {
        relation: Model.ManyToManyRelation,
        modelClass: Vote,
        join: {
          from: 'podcasts.id',
          through: {
            from: 'votes.podcastId',
            to: 'votes.userId'
          },
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Podcast
