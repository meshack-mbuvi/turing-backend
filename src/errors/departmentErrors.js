export const userErrors = {
  DEP_01: 'The ID is not a number.',
  DEP_02: "Don'exist department with this ID.",
};

export const departCustomError = (code, status, field) => {
  return {
    status,
    field,
    code: code,
    message: userErrors[code],
  };
};
