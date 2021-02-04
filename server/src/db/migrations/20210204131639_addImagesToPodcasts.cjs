/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table('podcasts', table => {
    table.string('imageUrl')
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table('podcasts', table => {
    table.dropColumn('imageUrl')
  })
}
