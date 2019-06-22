const Errors = {
  DEP_01: 'The ID is not a number.',
  DEP_02: "Don'exist department with this ID.",
};

export const handleDepartmentErrors = (code, status, field) => {
  return {
    status,
    field,
    code: code,
    message: Errors[code],
  };
};
