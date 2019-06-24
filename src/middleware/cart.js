import {handleCartErrors} from '../errors/index';

export const cart = (req, res, next) => {
  const {params: {item_id}, body: {quantity}} = req;

  if (!quantity) {
    return res
      .status (400)
      .send ({error: handleCartErrors ('CART_04', 400, 'quantity')});
  }

  if (quantity < 1 || isNaN (quantity)) {
    return res
      .status (400)
      .send ({error: handleCartErrors ('CART_03', 400, 'quantity')});
  }

  if (item_id < 1 || isNaN (item_id)) {
    return res
      .status (400)
      .send ({error: handleCartErrors ('CART_03', 400, 'item_id')});
  }
  next ();
};

export const addTocart = (req, res, next) => {
  const {body: {product_id, cart_id, attributes}} = req;

  if (!product_id || !cart_id || !attributes) {
    return res.status (400).send ({
      error: handleCartErrors ('CART_05', 400, 'product_id/cart_id/attributes'),
    });
  }

  next ();
};
