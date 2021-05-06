var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

/* GET channels listing. */
router.get('/', async function(req, res, next) {
  res.json(await mongoose.model('Channel').find());
});
router.post('/', async function(req, res, next) {
  const stream_key = uuidv4()
  const data = {
    name: req.body.name,
    stream_key,
    user: req.body.user
  }
  await mongoose.model('Channel').create(data)
  res.json({stream_key});
});
router.put('/:id', async function(req, res, next) {
  res.json(await mongoose.model('Channel').findByIdAndUpdate(req.params.id,req.body));
});
router.delete('/:id', async function(req, res, next) {
  res.json(await  mongoose.model('Channel').findByIdAndDelete(req.params.id));
});
router.get('/:id', async function(req, res, next) {
  res.json(await mongoose.model('Channel').findById(req.params.id));
});

module.exports = router;
