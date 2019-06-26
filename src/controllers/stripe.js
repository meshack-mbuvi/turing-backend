const Customer = require('../sequelize/models/').Customer;
const stripe = require('stripe')('sk_test_lomdOfxbm7QDgZWvR82UhV6D');

import { handleStripeErrors } from '../errors';
export class StripController {
 /**
   * Adds new customer to stripe
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} customer id returned by stripe api
   */
 static async createCustomer({ email, name = 'test' }) {
  const { id } = await stripe.customers.create({
   email,
   name,
   source: 'tok_visa',
  });

  return id;
 }

 /**
   * Retrieve stripe_customer_id, create the customer if not found in stripe
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} customer id returned by stripe api
   */
 static async getCustomerId(email) {
  const { data } = await stripe.customers.list({ email });
  if (!data.length) {
   return await StripController.createCustomer({ email });
  }

  const [user] = data;
  let id = user.id;

  return id;
 }

 /**
   * Handle payment for orders
   * This method receive a front-end payment and create a charge.
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} stripe charge object
   */
 static async charge(req, res) {
  const {
   order_id,
   amount,
   stripeToken = '',
   description = 'Payment for order',
   currency = 'USD',
  } = req;

  const paymentData = {
   currency,
   description,
   amount: Math.round(amount),
   metadata: { order_id },
  };

  try {
   // charge customer using their details stored in the application database
   if (!stripeToken) {
    const { user: { customer_id } } = req;
    let { email, stripe_customer_id } = await Customer.findOne({
     where: {
      customer_id,
     },
    });

    // get stripe_customer_id from stripe and save it for future reference
    if (!stripe_customer_id) {
     stripe_customer_id = await StripController.getCustomerId(email);
     await Customer.update({ stripe_customer_id }, { where: { email } });
    }
    paymentData.customer = stripe_customer_id;
   } else {
    paymentData.source = stripeToken;
   }

   const payment = await stripe.charges.create();

   return payment;
  } catch (error) {
   return res.send({
    error: handleStripeErrors('STRIPE_01', 400, 'VISA CARD'),
   });
  }
 }
}
