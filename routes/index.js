var express = require('express');
const ToyModel = require('../models/ToyModel');
var router = express.Router();

router.get('/', async (req, res) => {
  var toys = await ToyModel.find({});
  var total = await ToyModel.count();
  res.render('index', { toys : toys , total : total })
})

router.get('/customer', async (req, res) => {
  var toys = await ToyModel.find({});
  res.render('customer', { toys : toys });
})

router.get('/delete/:id', async(req, res) => {
  await ToyModel.findByIdAndDelete(req.params.id)
  .then(() => { console.log ('Delete Toy succeed !')})
  .catch((err) => { console.log ('Delete toy failed !')});
  res.redirect('/');
})

router.get('/drop', async(req, res) => {
  await ToyModel.deleteMany({})
  .then(() => { console.log ('Delete all toys succeed !')});
  res.redirect('/');
})

router.get('/add', (req, res) => {
  res.render('add');
})

router.post('/add', async (req, res) => {
  var toys = req.body;
  await ToyModel.create(toys)
  .then(() => { console.log ('Add new mobile succeed !')});
  res.redirect('/');
})

router.get('/edit/:id', async (req, res) => {
  var toys = await ToyModel.findById(req.params.id);
  res.render('edit', { toys : toys});
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  await ToyModel.findByIdAndUpdate(id)
  .then(() => { console.log('Edit toy succeed !') });
  res.redirect('/');
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
