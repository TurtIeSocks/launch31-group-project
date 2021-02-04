/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable('votes', table => {
    table.bigIncrements('id')
    table.bigInteger('podcastId')
      .notNullable()
      .index()
      .unsigned()
      .references('podcasts.id')
    table.bigInteger('userId')
      .notNullable()
      .index()
      .unsigned()
      .references('users.id')
    table.integer('value').notNullable()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('votes')
}
