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
        data = data.concat(getSpecialCases());
        return knex('tag').insert(data.map(v=>({tag: v})));
      });
    });
};

function getSpecialCases() {
  // Special case tag names for testing:
  return [
    'First_TagNone',
    'Second_TagNone',
    'First_TagOneHundred',
    'Second_TagOneHundred',
    'First_TagOneThousand',
    'Second_TagOneThousand'
  ];
}

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
