/* eslint-disable import/no-extraneous-dependencies */
const Model = require("./Model")

class Vote extends Model {
  static get tableName() {
    return "votes"
  }

  static get relationMappings() {
    const { Podcast, User } = require('./index.js')
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "votes.userId",
          to: "users.id"
        }
      },
      podcasts: {
        relation: Model.HasManyRelation,
        modelClass: Podcast,
        join: {
          from: "votes.podcastId",
          to: "podcasts.id"
        }
      }
    }
  }
}

module.exports = Vote
