const axios = require('axios');

exports.seed = function(knex) {
  const NUM_TAGS = 1000;
  // Deletes ALL existing entries
  return knex('tag').del()
    .then(function () {
      // Inserts random names generated from drycodes:
      return axios.get(`http://names.drycodes.com/${NUM_TAGS}?nameOptions=boy_names`)
      .then(response =>{
        let data = noDups(response.data);
        return knex('tag').insert(data.map(v=>({tag: v})));
      });
    });
};

function noDups(data) {
  let result = [];
  data.forEach(value => {
    let c = 1;
    let thisValue = value;
    while (result.includes(value)) {
      value = `${thisValue}_${c}`;
      c++;
    }
    result.push(value);
  });
  return result;
}
