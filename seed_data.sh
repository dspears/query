#!/bin/bash
knex migrate:latest
knex seed:run --specific seed_widgets.js
knex seed:run --specific seed_tags.js
knex seed:run --specific seed_dongles.js
knex seed:run --specific seed_widgets_tags.js
knex seed:run --specific seed_widgets_dongles.js
echo "Seeding done!"
