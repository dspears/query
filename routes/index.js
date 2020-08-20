const express = require('express');
const router = express.Router();
const { findWidgetsWithTag } = require('../utils/query.js');
const { getSomeRandomTags } = require('../utils/random_tags');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let query = {tag:'', max: 10, offset:0 }; 
  let tags = await getSomeRandomTags(req.app.locals.knex, 10);
  res.render('index', { title: 'tag query', query, result: null, tags });
});

router.get('/query', async function(req, res, next) {
  let result = await findWidgetsWithTag(req.app.locals.knex, req.query.tag, req.query.offset, req.query.max);
  let tags = await getSomeRandomTags(req.app.locals.knex, 10);
  res.render('index', { title: 'tag query', result, query: req.query, tags });
});

module.exports = router;
