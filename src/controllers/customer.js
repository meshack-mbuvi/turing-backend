const Customer = require('../sequelize/models').Customer;

import { StripController } from './stripe';
import { handleUserErrors } from '../errors/index';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export class CustomerController {
 /**
   * Sign up a new customer
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} Data for new customer
   */
 static async create(req, res) {
  try {
   const {
    body: {
     name,
     email,
     password,
     eve_phone,
     day_phone,
     credit_card,
     mob_phone,
    },
   } = req;

   if (!name) {
    return res
     .status(400)
     .send({ error: handleUserErrors('USR_02', 400, 'name') });
   }

   if (!email) {
    return res
     .status(400)
     .send({ error: handleUserErrors('USR_02', 400, 'email') });
   }

   const passwordHash = bcrypt.hashSync(password, 10);

   const customer = await Customer.create({
    name,
    email,
    credit_card,
    password: passwordHash,
    eve_phone: eve_phone || '',
    day_phone: day_phone || '',
    mob_phone: mob_phone || '',
    stripe_customer_id: '',
   });

   const accessToken =
    'Bearer ' +
    (await jwt.sign(
     { customer_id: customer.dataValues.customer_id },
     process.env.SECRET_KEY
    ));

   // Remove password hash/stripe_customer_id from returned details
   customer.password = undefined;
   customer.stripe_customer_id = undefined;

   customer.credit_card = credit_card ? `xxxxxxxx${credit_card.slice(-4)}` : '';

   return res.status(201).send({
    customer,
    accessToken,
    expires_in: '24h',
   });
  } catch (error) {
   return res
    .status(409)
    .send({ error: handleUserErrors('USR_04', 409, 'email') });
  }
 }

 /**
   * Handle use login
   * Verifies user details, assign the user a new token and returns the
   * customer data with assigned token
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} customer details with a JWT token attached
   */
 static async login(req, res) {
  const { body: { password, email } } = req;

  try {
   const customer = await Customer.findOne({ where: { email } });

   if (!customer) {
    return res.status(404).send({
     error: handleUserErrors('USR_05', 404, 'email'),
    });
   }

   if (customer && bcrypt.compareSync(password, customer.dataValues.password)) {
    const accessToken =
     'Bearer ' +
     (await jwt.sign(
      { customer_id: customer.dataValues.customer_id },
      process.env.SECRET_KEY
     ));

    // Remove password hash/stripe_customer_id from returned details
    customer.password = undefined;
    customer.stripe_customer_id = undefined;

    customer.credit_card = customer.credit_card
     ? `xxxxxxxx${credit_card.slice(-4)}`
     : '';
    return res.status(200).send({
     customer,
     accessToken,
     expires_in: '24h',
    });
   } else {
    return res.status(401).send({
     error: handleUserErrors('USR_01', 401, 'email/password'),
    });
   }
  } catch (error) {
   console.log(error);
   return res.send(error.message);
  }
 }

 /**
   * Retrieve single customer
   * customer data with assigned token
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} customer details
   */
 static async one(req, res) {
  const { user: { customer_id } } = req;

  try {
   const customer = await Customer.findOne({ where: { customer_id } });

   if (!customer) {
    return res.status(404).send({
     error: handleUserErrors('USR_05', 404, 'email'),
    });
   }
   customer.password = '';
   customer.credit_card = customer.credit_card
    ? `xxxxxxxx${credit_card.slice(-4)}`
    : '';

   return res.status(401).send(customer);
  } catch (error) {
   console.log(error);
   return res.send(error.message);
  }
 }

 /**
   * update customer details
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} customer data
   */
 static async update(req, res) {
  try {
   const {
    body: { name, email, password, eve_phone, day_phone, mob_phone },
    user: { customer_id },
   } = req;

   if (!name) {
    return res
     .status(400)
     .send({ error: handleUserErrors('USR_02', 400, 'name') });
   }

   if (!email) {
    return res
     .status(400)
     .send({ error: handleUserErrors('USR_02', 400, 'email') });
   }

   const passwordHash = bcrypt.hashSync(password, 10);

   const customer = await Customer.update(
    {
     name,
     email,
     password: passwordHash,
     eve_phone: eve_phone || '',
     day_phone: day_phone || '',
     mob_phone: mob_phone || '',
     stripe_customer_id: '',
    },
    {
     where: {
      customer_id,
     },
    }
   );

   return res.status(200).send({
    customer,
   });
  } catch (error) {
   return res
    .status(401)
    .send({ error: handleUserErrors('USR_04', 409, 'email') });
  }
 }

 /**
   * Update customer address details
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} customer data
   */
 static async address(req, res) {
  const {
   body: {
    address_1,
    address_2,
    city,
    region,
    postal_code,
    country,
    shipping_region_id,
   },
   user: { customer_id },
  } = req;

  try {
   if (
    !address_1 ||
    !address_2 ||
    !city ||
    !region ||
    !postal_code ||
    !country ||
    !shipping_region_id
   ) {
    return res
     .status(400)
     .send({ error: handleUserErrors('USR_02', 400, 'fields') });
   }

   await Customer.update(
    {
     address_1,
     address_2,
     city,
     region,
     postal_code,
     country,
     shipping_region_id,
    },
    {
     where: {
      customer_id,
     },
    }
   );

   return res.send({
    message: 'Customer details updated',
   });
  } catch (error) {
   console.log(error);
   return res.send({
    error: {
     message: 'An error has occurred while updating details',
     field: 'unknown',
     status: 500,
    },
   });
  }
 }

 /**
   * Update customer credit card details
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} customer data
   */
 static async creditCard(req, res) {
  const { body: { credit_card }, user: { customer_id } } = req;

  try {
   if (!credit_card) {
    return res
     .status(400)
     .send({ error: handleUserErrors('USR_02', 400, 'fields') });
   }

   await Customer.update(
    {
     credit_card,
    },
    {
     where: {
      customer_id,
     },
    }
   );

   return res.send({
    message: 'Credit card details updated.',
   });
  } catch (error) {
   return res.send({
    error: {
     message: 'An error has occurred while updating details',
     field: 'unknown',
     status: 500,
    },
   });
  }
 }
}
