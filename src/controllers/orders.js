import { handleCartErrors, handleOrderErrors } from '../errors/index';

import { CartController } from './cart';
import { StripController } from './stripe';
import { sendEmail } from './email';

const Orders = require('../sequelize/models').Orders;
const Cart = require('../sequelize/models').Cart;
const Tax = require('../sequelize/models').Tax;
const OrderDetail = require('../sequelize/models/').OrderDetail;
const Customer = require('../sequelize/models/').Customer;

export class OrderController {
 /**
   * Get a single order
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A single order
   */
 static async one(req, res) {
  const { params: { order_id }, user: { customer_id } } = req;

  if (isNaN(order_id)) {
   return res
    .status(400)
    .send({ error: handleOrderErrors('ORD_01', 400, 'order_id') });
  }

  const order = await OrderDetail.findAll({
   where: {
    order_id,
   },
   include: [
    {
     model: Orders,
     attributes: [],
     include: [
      {
       model: Customer,
       attributes: [],
       where: {
        customer_id,
       },
      },
     ],
    },
   ],
  });

  if (!order.length) {
   return res
    .status(404)
    .send({ error: handleOrderErrors('ORD_02', 404, 'order_id') });
  }

  return res.status(200).send(order);
 }

 /**
   * Get detail of a single order
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} Order detail
   */
 static async orderDetail(req, res) {
  const { params: { order_id }, user: { customer_id } } = req;

  if (isNaN(order_id)) {
   return res
    .status(400)
    .send({ error: handleOrderErrors('ORD_01', 400, 'order_id') });
  }

  const order = await Orders.findOne({
   where: {
    order_id,
    customer_id,
   },
   attributes: [
    'order_id',
    'total_amount',
    'created_on',
    'shipped_on',
    'status',
   ],
  });

  if (!order) {
   return res
    .status(404)
    .send({ error: handleOrderErrors('ORD_02', 404, 'order_id') });
  }

  const status = order.status ? 'paid' : 'not paid';
  order.status = status;

  return res.status(200).send(order);
 }

 /**
   * Get all orders for a given (logged in) customer
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} Orders
   */
 static async orderInCustomer(req, res) {
  const { user: { customer_id } } = req;

  const order = await Orders.findOne({
   where: {
    customer_id,
   },
   attributes: [
    'order_id',
    'total_amount',
    'created_on',
    'shipped_on',
    'status',
   ],
  });

  if (!order) {
   return res
    .status(404)
    .send({ error: handleOrderErrors('ORD_02', 404, 'order_id') });
  }

  const status = order.status ? 'paid' : 'not paid';
  order.status = status;

  return res.status(200).send(order);
 }

 /** Order products
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} order
   */
 static async create(req, res) {
  const {
   body: { cart_id, shipping_id, tax_id = 1 },
   user: { customer_id },
  } = req;

  try {
   const cart = await Cart.findOne({
    where: {
     cart_id,
    },
   });

   if (!cart) {
    return res
     .status(404)
     .send({ error: handleCartErrors('CART_01', 404, 'cart_id') });
   }

   /**
      * Get all items in the cart and
      * calculate total amount for the given cart
      * */
   const items = await CartController.getCartItems(cart_id);
   let total_amount = 0;

   items.forEach(item => {
    total_amount += item.subtotal;
   });

   // create new order now
   const order = await Orders.create({
    total_amount,
    customer_id,
    shipping_id,
    tax_id,
    status: 0,
    shipped_on: null,
    reference: '',
    auth_code: '',
    comments: 'Thank you for shopping with us',
    created_on: Date.now(),
   });
   const { order_id } = order;

   // save order detail
   items.map(
    async ({
     product_id,
     attributes,
     quantity,
     name: product_name,
     price: unit_cost,
    }) => {
     try {
      await OrderDetail.create({
       order_id,
       product_id,
       attributes,
       product_name,
       quantity,
       unit_cost,
      });
     } catch (error) {
      console.log(error);
     }
    }
   );

   const { email } = await Customer.findOne({
    where: {
     customer_id,
    },
   });

   // get tax details
   const { tax_percentage } = await Tax.findOne({
    where: {
     tax_id,
    },
   });

   order.tax_percentage = tax_percentage;

   await sendEmail(email, order);

   return res.status(201).send({ order_id });
  } catch (error) {
   console.log(error);
  }
 }
}
