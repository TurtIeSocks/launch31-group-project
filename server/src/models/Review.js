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
        rating: { type: "string", minLength: 1}
      }
    }
  }
  static get relationMappings(){
    const { Podcast } = require("./index.js")

    return {
      podcast: {
        relation: Model.BelongsToOneRelation,
        modelClass: Podcast,
        join: {
          from: "reviews.podcastId",
          to: "podcasts.id"
        }
      }
    }
  }
}

module.exports = Review