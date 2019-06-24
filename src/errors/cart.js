const Errors = {
  CART_01: 'Cart with this ID does not exist.',
  CART_02: 'Item with this ID does not exist in the cart.',
  CART_03: 'Item_id/quantity must be a number greater than 0.',
  CART_04: 'Quantity must be provided',
  CART_05: 'Product_id/cart_id/attributes must be provided',
};

export const handleCartErrors = (code, status, field) => {
  return {
    status,
    field,
    code: code,
    message: Errors[code],
  };
};
