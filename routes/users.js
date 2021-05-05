var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.json(await mongoose.model('User').find());
});
router.post('/', async function(req, res, next) {
  console.log(req.body)
  // res.json(await mongoose.model('User').create(req.body));
});
router.put('/:id', async function(req, res, next) {
  res.json(await mongoose.model('User').findByIdAndUpdate(req.params.id,req.body));
});
router.delete('/:id', async function(req, res, next) {
  res.json(await  mongoose.model('User').findByIdAndDelete(req.params.id));
});
router.get('/:id', async function(req, res, next) {
  res.json(await mongoose.model('User').findById(req.params.id));
});

module.exports = router;
