
exports.up = function(knex) {
  return knex.schema.createTable("widget_dongle_map", table => {
    table.bigInteger("widget_id").unsigned().notNullable().references('id').inTable('widget');
    table.bigInteger("dongle_id").unsigned().notNullable().references('id').inTable('dongle');
    table.unique(["widget_id", "dongle_id"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("widget_dongle_map"); 
};
