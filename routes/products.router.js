const express = require('express');

const ProductService = require('../services/product.service');
const { ro } = require('@faker-js/faker');

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res) => {
  try {
    const products = await service.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
module.exports = router;
