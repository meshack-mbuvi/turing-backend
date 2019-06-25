const Errors = {
  ORD_01: 'Order_id should be a number',
  ORD_02: 'Order with this ID does not exist.'
};

export const handleOrderErrors = (code, status, field) => {
  return {
    status,
    field,
    code: code,
    message: Errors[code]
  };
};
