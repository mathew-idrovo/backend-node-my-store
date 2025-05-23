const express = require('express');

const productRouter = require('./products.router');
const userRouter = require('./users.router');
const customerRouter = require('./customers.router');
const categoryRouter = require('./category.router');
const authRouter = require('./auth.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productRouter);
  router.use('/users', userRouter);
  router.use('/customers', customerRouter);
  router.use('/categories', categoryRouter);
  router.use('/auth', authRouter);
}

module.exports = routerApi;
