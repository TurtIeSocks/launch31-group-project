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
}

module.exports = Podcast;
