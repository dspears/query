const axios = require('axios');

exports.seed = function(knex) {
  const NUM_WIDGETS = 10000;
  // Deletes ALL existing entries
  return knex('widget').del()
    .then(function () {
      // Inserts random names generated from drycodes:
      return axios.get(`http://names.drycodes.com/${NUM_WIDGETS}?nameOptions=objects`)
      .then(response =>{
        return knex('widget').insert(response.data.map(v=>({name: v})));
      });
    });
};
