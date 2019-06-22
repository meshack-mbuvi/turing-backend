const Errors = {
  PROD_01: 'The ID is not a number.',
  PROD_02: "Don'exist product with this ID.",
};

export const handleProductErrors = (code, status, field) => {
  return {
    status,
    field,
    code: code,
    message: Errors[code],
  };
};
