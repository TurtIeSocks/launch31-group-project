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
        name: { type: "string", minLength: 1 }
      }
    }
  }
}

module.exports = Genre