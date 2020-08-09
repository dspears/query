const { getRandomIntSet } = require('../utils/random_ints.js');

async function getTags(knex) {
  return knex.select('*').from('tag');
}

async function getSomeRandomTags(knex, howMany) {
  const tags = await getTags(knex);
  const randomIndicies = getRandomIntSet(0, tags.length-1, howMany);
  return Array.from(randomIndicies).map(v => tags[v].tag);
}

module.exports.getSomeRandomTags = getSomeRandomTags;
