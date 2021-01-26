const Model = require("./Model");

class Podcast extends Model {
  static get tableName() {
    return "podcasts";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", minLength: 1 },
        description: { type: "string", minLength: 1 },
      },
    };
  }

  static get relationMappings() {
    const { Genre } = require("./index.js");

    return {
      genre: {
        relation: Model.BelongsToOneRelation,
        modelClass: Genre,
        join: {
          from: "podcasts.genreId",
          to: "genres.id",
        },
      },
    };
  }
}

module.exports = Podcast;
