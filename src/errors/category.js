const Errors = {
  CAT_01: 'The ID is not a number.',
  CAT_02: "Don'exist category with this ID.",
};

export const handleCategoryErrors = (code, status, field) => {
  return {
    status,
    field,
    code: code,
    message: Errors[code],
  };
};
