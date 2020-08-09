
exports.up = function(knex) {
  return knex.schema.createTable("dongle", table => {
    table.bigincrements("id").primary().notNullable();
    table.string("name", 256).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("dongle");
};
