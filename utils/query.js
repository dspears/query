
// For a given tag value, find non-deleted widgets associated with that tag 
// in sorted order, and with the given offset and limit
async function findWidgetsForTag(knex, tag, offset, max) {
  return knex.select('widget.*').from('widget')
    .join('widget_tag_map', 'widget.id', 'widget_tag_map.widget_id')
    .join('tag', 'tag.id', 'widget_tag_map.tag_id')
    .where('tag.tag',tag)
    .where('widget.deleted',0)
    .orderBy('widget.name').limit(max).offset(offset);
}

// Given a set of widget ids, return sets of tags associated with those widgets.
async function findTagsForWidgetIds(knex, widgetIdList) {
  return knex.select('widget_tag_map.widget_id', 'tag.*').from('tag', 'widget_tag_map')
    .join('widget_tag_map', 'tag.id', 'widget_tag_map.tag_id')
    .whereIn('widget_tag_map.widget_id', widgetIdList);
}

// Given a set of widget ids, return sets of dongles associated with those widgets.
async function findDonglesForWidgetIds(knex, widgetIdList) {
  return knex.select('widget_dongle_map.widget_id', 'dongle.*').from('dongle', 'widget_dongle_map')
    .join('widget_dongle_map', 'dongle.id', 'widget_dongle_map.dongle_id')
    .whereIn('widget_dongle_map.widget_id', widgetIdList);
}

/**
 * findWidgetsWithTag - given a tag value, search for widgets with the associated tag.
 * Return a list of matching widgets sorted by name, along with associated tags and dongles
 * collections per widget.
 * 
 * @param {} knex - knex db connection instance.
 * @param {*} tag - tag value to search for.
 * @param {*} offset - 0 indexed offset in results set.
 * @param {*} max - max number of widgets to return.
 */
async function findWidgetsWithTag(knex, tag, offset, max) {
  const startTime = Date.now();
  let results = [];

  const widgets = await findWidgetsForTag(knex,tag,offset,max);
  // Get a list of the widget id's we can use in the tags and dongles queries.
  const widgetIdList = widgets.map(widget => widget.id);
  const tags = await findTagsForWidgetIds(knex, widgetIdList);
  const dongles = await findDonglesForWidgetIds(knex, widgetIdList);

  // Convert query results into desired format by:
  // - adding each widget to a Map with key of widget id, and value object containing empty arrays for tags and dongles.
  // - for each tag, lookup the widget in the map (by widget.id), and append the tag into the widget's tags array.
  // - likewise for each dongle.
  // - finally, loop over the widget map and build an array of widget results that we return.
  //
  let widgetMap = new Map();
  widgets.forEach(widget => widgetMap.set(widget.id, {id: widget.id, name: widget.name, tags: [], dongles: []}));
  tags.forEach(tag => widgetMap.get(tag.widget_id).tags.push({tag_id: tag.id, tag: tag.tag}));
  dongles.forEach(dongle => widgetMap.get(dongle.widget_id).dongles.push({dongle_id: dongle.id, name: dongle.name}));
  widgetMap.forEach(widget => results.push(widget));
  const endTime = Date.now();
  const executionTimeInMs = endTime - startTime;
  // Return some info about the query along with results:
  const query = {
    tag, offset, max, numWidgetsReturned: results.length, executionTimeInMs
  }
  return {
    query,
    results
  }
}

module.exports.findWidgetsWithTag = findWidgetsWithTag;
