const Errors = {
  CAT_01: 'The ID is not a number.',
  CAT_02: "Category with this ID does not exist.",
};

export const handleCategoryErrors = (code, status, field) => {
  return {
    status,
    field,
    code: code,
    message: Errors[code],
  };
};
