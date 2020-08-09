const axios = require('axios');

exports.seed = function(knex) {
  async function getWidgets() {
    return knex.select('*').from('widget');
  }
  
  async function getTags() {
    return knex.select('*').from('tag');
  }

  function addWidgetsForTag(tagId, widgets, number) {
    let result = [];
    const RANDOM_START_LIMIT = 100;
    const random_offset = Math.floor(Math.random() * RANDOM_START_LIMIT);
    const range = widgets.length - random_offset;
    const increment = Math.round(range / number);
    let index = random_offset;
    do {
      result.push({tag_id: tagId, widget_id: widgets[index].id});
      index += increment;
    } while (index < widgets.length);
    return result;
  }

  function associateTagsToWidgets(tags, widgets) {
    let result = [];
    tags.forEach(tag=>{
      console.log("Tag is: ", tag.tag, ' id is ', tag.id);
      if (tag.tag.includes("TagNone")) {
        // do nothing here.  It's a tag with no associated widgets.
      } else if (tag.tag.includes("TagOneHundred")) {
        result = result.concat(addWidgetsForTag(tag.id, widgets, 100));
      } else if (tag.tag.includes("TagOneThousand")) {
        result = result.concat(addWidgetsForTag(tag.id, widgets, 1000));
      } else {
        result = result.concat(addWidgetsForTag(tag.id, widgets, 10));
      }
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

