const { getRandomInt, getRandomIntSet } = require('../utils/random_ints.js');

exports.seed = function(knex) {
  async function getWidgets() {
    return knex.select('*').from('widget');
  }
  
  async function getDongles() {
    return knex.select('*').from('dongle');
  }

  function addDonglesForWidget(widgetId, dongles, number) {
    let result = [];
    let randomIndexSet = getRandomIntSet(0, dongles.length-1, number);
    for (let index of randomIndexSet) {
      result.push({widget_id: widgetId, dongle_id: dongles[index].id})
    }
    return result;
  }

  function associateDonglesToWidgets(dongles, widgets) {
    let result = [];
    widgets.forEach(widget=>{
      // Add 10 to 20 dongles per widget:
      result = result.concat(addDonglesForWidget(widget.id, dongles, getRandomInt(10,20)));
    });
    return result;
  }

  // Deletes ALL existing entries
  return knex('widget_dongle_map').del()
    .then(async function () {
      // Inserts seed entries
      const widgets = await getWidgets();
      const dongles = await getDongles();
      let widgets_dongles = associateDonglesToWidgets(dongles, widgets);
      console.log("Found: w, d, w_d ", widgets.length, dongles.length, widgets_dongles.length);
      return knex('widget_dongle_map').insert(widgets_dongles);
    });
};
