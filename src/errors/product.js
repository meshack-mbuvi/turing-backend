const Errors = {
  PROD_01: 'The ID is not a number.',
  PROD_02: "Product with this ID does not exist.",
};

export const handleProductErrors = (code, status, field) => {
  return {
    status,
    field,
    code: code,
    message: Errors[code],
  };
};
