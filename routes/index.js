var express = require('express');
const ToyModel = require('../models/ToyModel');
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


module.exports = router;
