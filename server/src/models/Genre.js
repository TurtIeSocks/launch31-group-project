const Model = require("./Model.js");

class Genre extends Model {
  static get tableName() {
    return "genres";
  }
}

module.exports = Genre;