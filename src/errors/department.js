const Errors = {
  DEP_01: 'The ID is not a number.',
  DEP_02: "Department with this ID does not exist.",
};

export const handleDepartmentErrors = (code, status, field) => {
  return {
    status,
    field,
    code: code,
    message: Errors[code],
  };
};
