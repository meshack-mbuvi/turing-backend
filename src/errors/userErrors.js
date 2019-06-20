export const userErrors = {
  USR_01: 'Email or Password is invalid.',
  USR_02: 'The field(s) are/is required.',
  USR_03: 'The email is invalid.',
  USR_04: 'The email already exists.',
  USR_05: "The email doesn't exist.",
  USR_06: 'This is an invalid phone number.',
  USR_07: 'This is too long <FIELD NAME>.',
  USR_08: 'This is an invalid Credit Card.',
  USR_09: 'The Shipping Region ID is not number',
};

export const customError = (code, status, field) => {
  return {
    status,
    field,
    code: code,
    message: userErrors[code],
  };
};
