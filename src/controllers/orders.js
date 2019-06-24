import {handleCategoryErrors, handleDepartmentErrors} from '../errors/index';
const Orders = require ('../sequelize/models').Orders;
const ShoppingCart = require ('../sequelize/models').ShoppingCart;
const Product = require ('../sequelize/models').Product;

export class OrdersController {
  /**
   * Get a single order
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A single order
   */
  static async one (req, res) {
    const {params: {order_id}} = req;

    if (isNaN (order_id)) {
      return res
        .status (400)
        .send ({error: handleOrderErrors ('ORD_01', 400, 'order_id')});
    }

    const order = await Orders.findOne ({
      where: {
        order_id,
      },
    });

    if (!order) {
      return res
        .status (404)
        .send ({error: handleOrderErrors ('ORD_02', 404, 'order_id')});
    }

    return res.status (200).send (order);
  }

  /** Order products
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} order
   */
  static async create (req, res) {
    const {body: {cart_id, shipping_id, tax_id}} = req;

    let order = await Orders.findOne ({
      where: {
        cart_id,
      },
    });

    if (order) {
      return res
        .status (409)
        .send ({error: handleProductErrors ('ORD_02', 409, 'cart_id')});
    }

    const shopping_cart = await ShoppingCart.findOne ({
      where: {
        cart_id,
      },
      include: [
        {
          model: Product,
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!shopping_cart) {
      return res
        .status (404)
        .send ({error: handleProductErrors ('SPC_01', 404, 'cart_id')});
    }

    const {product_id, attributes, quantity} = shopping_cart;

    order = await Orders.create ({
      total_amount,
      status: 'pending',
      comments,
      customer_id,
      shipping_id,
      tax_id,
      created_on: Date.now (),
    });

    return res.status (201).send (reviews);
  }
}
