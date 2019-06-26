import { handleCartErrors, handleProductErrors } from '../errors/index';
const Cart = require('../sequelize/models').Cart;
const Product = require('../sequelize/models').Product;

const uuidv1 = require('uuid/v1');
const Sequelize = require('sequelize');

export class CartController {
 /**
   * Add a product in the cart
   * Checks whether product is in cart and increments the quantity if found
   * Otherwise, add a new item to cart
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} shopping cart
   */
 static async add(req, res) {
  const { body: { cart_id, product_id, attributes } } = req;

  // Retrieve product details
  const productDetails = await Product.findOne({
   where: {
    product_id,
   },
  });

  if (!productDetails) {
   // product does not exist
   return res
    .status(404)
    .send({ error: handleProductErrors('PROD_02', 404, 'product_id') });
  }

  // check whether product is already in cart and update its quantity
  let product = await Cart.findOne({
   where: { product_id, cart_id, attributes },
   include: [
    {
     model: Product,
     on: {
      id: Sequelize.where(
       Sequelize.col('Cart.product_id'),
       '=',
       Sequelize.col('Product.product_id')
      ),
     },
    },
   ],
  });

  if (product) {
   // update the quantity of the item in the shopping cart
   const quantity = product.quantity + 1;

   const cart = await Cart.update(
    {
     quantity,
    },
    {
     where: {
      product_id,
      cart_id,
     },
    }
   );

   const { item_id, Product: { name, price, image } } = product;
   const subtotal = quantity * price;

   return res.status(200).send([
    {
     item_id,
     name,
     attributes,
     product_id,
     price,
     quantity,
     image,
     subtotal,
    },
   ]);
  }

  // add new item to shopping cart
  const cart = await Cart.create({
   cart_id,
   product_id,
   attributes,
   quantity: 1,
   buy_now: true,
   added_on: Date.now(),
  });

  const { name, price, image } = productDetails;
  const { item_id, quantity } = cart;
  const subtotal = quantity * price;

  return res.status(201).send([
   {
    item_id,
    name,
    attributes,
    product_id,
    price,
    quantity,
    image,
    subtotal,
   },
  ]);
 }

 /**
   * Generate a shopping cart_id
   * Generates a new timestamped string(uuid string),
   * and gets the last substring of the generated uuid
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} shopping cart id
   */
 static async generateUniqueCartId(req, res) {
  const [, , , , cart_id] = uuidv1().split('-');

  return res.status(200).send({
   cart_id,
  });
 }

 /**
   * Get and format cart items
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} items
   */
 static async getCartItems(cart_id) {
  const cart = await Cart.findAll({
   where: { cart_id },
   include: [
    {
     model: Product,
     on: {
      id: Sequelize.where(
       Sequelize.col('Cart.product_id'),
       '=',
       Sequelize.col('Product.product_id')
      ),
     },
    },
   ],
  });

  if (cart.length) {
   const items = cart.map(item => {
    const {
     item_id,
     quantity,
     attributes,
     Product: { name, product_id, price, image },
    } = item;

    return {
     item_id,
     name,
     attributes,
     product_id,
     quantity,
     image,
     price,
     subtotal: quantity * price,
    };
   });

   return items;
  }
  return null;
 }

 /**
   * Get list of products in a shopping cart
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} shopping cart id
   */
 static async getCart(req, res) {
  const { params: { cart_id } } = req;

  const cart = await CartController.getCartItems(cart_id);
  if (cart) {
   return res.status(200).send(cart);
  }
  return res
   .status(404)
   .send({ error: handleCartErrors('CART_02', 404, 'cart_id') });
 }

 /**
   * update product quantity in the cart
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} An array of products in cart
   */
 static async update(req, res) {
  const { body: { quantity }, params: { item_id } } = req;

  const itemUpdated = await Cart.update(
   {
    quantity,
   },
   { where: { item_id } }
  );

  // Get cart details
  const cart = await Cart.findOne({ where: { item_id } });

  if (!cart) {
   return res.send({
    error: handleCartErrors('CART_02', 404, 'item_id'),
   });
  }

  const items = await CartController.getCartItems(cart.cart_id);
  return res.status(200).send(items);
 }

 /**
   * Remove all items from shopping cart
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} An empty cart
   */
 static async empty(req, res) {
  const { params: { cart_id } } = req;

  await Cart.destroy({
   where: {
    cart_id,
   },
  });

  return res.status(200).send([]);
 }

 /**
   * Return total amount from the shopping cart
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} total amount
   */
 static async totalAmount(req, res) {
  const { params: { cart_id } } = req;

  const items = await CartController.getCartItems(cart_id);
  let total_amount = 0;

  items.forEach(item => {
   total_amount += item.subtotal;
  });

  return res.status(200).send({ total_amount });
 }

 /**
   * Remove item from shopping cart
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} no data
   */
 static async deleteItem(req, res) {
  const { params: { item_id } } = req;

  const item = await Cart.destroy({
   where: { item_id },
  });
  // const items = await CartController.getCartItems (cart_id);

  return res.status(200).send({ message: 'item removed from cart' });
 }
}
