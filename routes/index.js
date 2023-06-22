var express = require('express');
const ToyModel = require('../models/ToyModel');
const MohinhModel = require('../models/MohinhModel')
var router = express.Router();

router.get('/', async (req, res) => {
  var toys = await ToyModel.find({});
  res.render('customer', { toys: toys})
})

router.get('/index', async (req, res) => {
  var toys = await ToyModel.find({});
  var total = await ToyModel.count();
  res.render('index', { toys: toys, total: total })
})

router.get('/customer', async (req, res) => {
  var toys = await ToyModel.find({});
  res.render('customer', { toys: toys });
})

router.get('/mohinh', async (req, res) => {
  var mohinh = await MohinhModel.find({});
  res.render('mohinh', { mohinh: mohinh });
})

router.get('/figure', async (req, res) => {
  var mohinh = await MohinhModel.find({});
  res.render('figure', { mohinh: mohinh });
})

router.get('/delete/:id', async (req, res) => {
  await ToyModel.findByIdAndDelete(req.params.id)
    .then(() => { console.log('Delete Toy succeed !') })
    .catch((err) => { console.log('Delete toy failed !') });
  res.redirect('/');
})

router.get('/drop', async (req, res) => {
  await ToyModel.deleteMany({})
    .then(() => { console.log('Delete all toys succeed !') });
  res.redirect('/');
})

router.get('/add', (req, res) => {
  res.render('add');
})

router.post('/add', async (req, res) => {
  var toys = req.body;
  await ToyModel.create(toys)
    .then(() => { console.log('Add new toy succeed !') });
  res.redirect('/');
})

router.get('/edit/:id', async (req, res) => {
  var toys = await ToyModel.findById(req.params.id);
  res.render('edit', { toys: toys });
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  await ToyModel.findByIdAndUpdate(id, req.body)
    .then(() => { console.log('Edit toy succeed !') });
  res.redirect('/');
})

router.get('/order/:id', async (req, res) => {
  var toys = await ToyModel.findById(req.params.id);
  res.render('order', { toys: toys })
})

router.post('/confirm', (req, res) => {
  var order = req.body;
  var image = order.image;
  var name = order.name;
  var quantity = order.quantity;
  var price = order.price;
  var total = price * quantity;
  console.log("Toy Name: " + name);
  console.log("Order quantity : " + quantity);
  console.log("Total price: " + total);
  res.render('confirm', { name: name, quantity: quantity, price: price, total: total });
});


//Figure:
router.get('/delete1/:id', async (req, res) => {
  await MohinhModel.findByIdAndDelete(req.params.id)
    .then(() => { console.log('Delete Toy succeed !') })
    .catch((err) => { console.log('Delete toy failed !') });
  res.redirect('/');
})

router.get('/drop1', async (req, res) => {
  await MohinhModel.deleteMany({})
    .then(() => { console.log('Delete all toys succeed !') });
  res.redirect('/');
})

router.get('/add1', (req, res) => {
  res.render('add1');
})

router.post('/add1', async (req, res) => {
  var mohinh = req.body;
  await MohinhModel.create(mohinh)
    .then(() => { console.log('Add new toy succeed !') });
  res.redirect('/');
})

router.get('/edit1/:id', async (req, res) => {
  var mohinh = await MohinhModel.findById(req.params.id);
  res.render('edit1', { mohinh: mohinh });
})

router.post('/edit1/:id', async (req, res) => {
  var id = req.params.id;
  await MohinhModel.findByIdAndUpdate(id, req.body)
    .then(() => { console.log('Edit toy succeed !') });
  res.redirect('/');
})




module.exports = router;
