const { getRandomInt, getRandomIntSet } = require('../utils/random_ints.js');

exports.seed = function(knex) {
  async function getWidgets() {
    return knex.select('*').from('widget');
  }
  
  async function getTags() {
    return knex.select('*').from('tag');
  }

  function addTagsForWidget(widgetId, tags, number) {
    let result = [];
    let randomIndexSet = getRandomIntSet(0, tags.length-1, number);
    for (let index of randomIndexSet) {
      result.push({widget_id: widgetId, tag_id: tags[index].id})
    }
    return result;
  }

  function associateTagsToWidgets(tags, widgets) {
    let result = [];
    widgets.forEach(widget=>{
      // Add 1 to 10 tags per widget:
      result = result.concat(addTagsForWidget(widget.id, tags, getRandomInt(1,10)));
    });
    return result;
  }

  // Deletes ALL existing entries
  return knex('widget_tag_map').del()
    .then(async function () {
      // Inserts seed entries
      const widgets = await getWidgets();
      const tags = await getTags();
      let widgets_tags = associateTagsToWidgets(tags, widgets);
      // widgets_tags.forEach(v=>console.log(v));
      console.log("Found: w, t, w_t ", widgets.length, tags.length, widgets_tags.length);
      return knex('widget_tag_map').insert(widgets_tags);
    });
};

