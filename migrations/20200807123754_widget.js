
exports.up = function(knex) {
  return knex.schema.createTable("widget", table => {
    table.bigincrements("id").primary().notNullable();
    table.string("name", 256).notNullable();
    table.boolean("deleted").defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("widget");
};
