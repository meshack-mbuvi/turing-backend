const Errors = {
  PAT_01: 'The ID is not a number.',
  PAT_02: "Don'exist attribute with this ID.",
};

export const handleAttributeErrors = (code, status, field) => {
  return {
    status,
    field,
    code: code,
    message: Errors[code],
  };
};
