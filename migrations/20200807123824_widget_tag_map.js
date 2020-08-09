
exports.up = function(knex) {
  return knex.schema.createTable("widget_tag_map", table => {
    table.bigInteger("widget_id").unsigned().notNullable().references('id').inTable('widget');
    table.bigInteger("tag_id").unsigned().notNullable().references('id').inTable('tag');
    table.unique(["widget_id", "tag_id"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("widget_tag_map");
};
