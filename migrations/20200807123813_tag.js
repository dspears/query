
exports.up = function(knex) {
  return knex.schema.createTable("tag", table => {
    table.bigincrements("id").primary().notNullable();
    table.string("tag", 64);
    table.unique("tag");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("tag");
};
