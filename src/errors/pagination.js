const Errors = {
  PAG_01: "The order is not matched 'field,(DESC|ASC)'",
  PAG_02: 'The pagination value should be greater than 0',
  PAG_03: 'The limit should be greater than 0',
};

export const handlePaginationErrors = (code, status, field) => {
  return {
    status,
    field,
    code: code,
    message: Errors[code],
  };
};
