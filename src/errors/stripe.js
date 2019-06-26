const Errors = {
 STRIPE_01:
  'The card is invalid or expired or the card has insufficient available balance.',
};

export const handleStripeErrors = (code, status, field) => {
 return {
  status,
  field,
  code: code,
  message: Errors[code],
 };
};
