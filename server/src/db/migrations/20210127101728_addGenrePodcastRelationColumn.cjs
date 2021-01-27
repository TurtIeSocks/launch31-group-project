/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table('podcasts', table => {
    table.bigInteger('genreId')
      .notNullable()
      .index()
      .references('genres.id')
      .unsigned()
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table('podcasts', table => {
    table.dropColumn('genreId')
  })
}
