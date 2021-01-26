/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("podcasts", (table) => {
    table.bigIncrements("id").primary();
    table.string("name").notNullable().unique();
    table.string("description");
    table.bigInteger("genreId").unsigned().index().notNullable().references("genres.id");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("podcasts");
};
