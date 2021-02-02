const Model = require("./Model")

class Review extends Model {
  static get tableName() {
    return "reviews"
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["description", "rating"],
      properties: {
        description: { type: "string", minLength: 1 },
        rating: { type: "string", minLength: 1},
        userId: { type: ["string", "integer"] }
      }
    }
  }
  static get relationMappings(){
    const { Podcast, User } = require("./index.js")

    return {
      podcast: {
        relation: Model.BelongsToOneRelation,
        modelClass: Podcast,
        join: {
          from: "reviews.podcastId",
          to: "podcasts.id"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "reviews.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Review