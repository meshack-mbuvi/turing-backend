const Errors = {
  REV_01: 'The field(s)(review and rating) are/is required.',
  REV_02: 'You already reviewed this product',
};

export const handleReviewErrors = (code, status, field) => {
  return {
    status,
    field,
    code: code,
    message: Errors[code],
  };
};
