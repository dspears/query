const axios = require('axios');

exports.seed = function(knex) {
  const NUM_DONGLES = 10000;
  // Deletes ALL existing entries
  return knex('dongle').del()
    .then(function () {
      // Inserts random names generated from drycodes:
      return axios.get(`http://names.drycodes.com/${NUM_DONGLES}?nameOptions=girl_names`)
      .then(response =>{
        return knex('dongle').insert(response.data.map(v=>({name: v})));
      });
    });
};
