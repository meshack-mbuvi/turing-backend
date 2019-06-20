export const userErrors = {
  PAG_01: "The order is not matched 'field,(DESC|ASC)'",
  PAG_02: "The field of order is not allow for sorting.",
};

export const paginationCustomError = (code, status, field) => {
  return {
    status,
    field,
    code: code,
    message: userErrors[code],
  };
};
