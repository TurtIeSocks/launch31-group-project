/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table('podcasts', table => {
    table.bigInteger('userId')
      .notNullable()
      .index()
      .unsigned()
      .references('users.id')
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table('podcasts', table => {
    table.dropColumn('userId')
  })
}
