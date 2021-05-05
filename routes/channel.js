var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

/* GET channels listing. */
router.get('/', async function(req, res, next) {
  res.json(await mongoose.model('Channel').find());
});
router.post('/', async function(req, res, next) {
  console.log(req.body)
  // res.json(await mongoose.model('Channel').create(req.body));
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
