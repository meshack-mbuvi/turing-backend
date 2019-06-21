const Customer = require ('../sequelize/models').Customer;
import {handleUserErrors} from '../errors/index';

const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');

export class CustomerController {
  /**
   * Sign up a new customer
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} Data for new customer
   */
  static async create (req, res) {
    try {
      const {
        body: {name, email, password, eve_phone, day_phone, mob_phone},
      } = req;

      if (!name) {
        return res
          .status (400)
          .send ({error: handleUserErrors ('USR_02', 400, 'name')});
      }

      if (!email) {
        return res
          .status (400)
          .send ({error: handleUserErrors ('USR_02', 400, 'email')});
      }

      const passwordHash = bcrypt.hashSync (password, 10);

      const customer = await Customer.create ({
        name,
        email,
        password: passwordHash,
        eve_phone: eve_phone || '',
        day_phone: day_phone || '',
        mob_phone: mob_phone || '',
      });

      const accessToken = await jwt.sign (
        {customer_id: customer.customer_id, name},
        process.env.SECRET_KEY,
        {
          expiresIn: '24h',
        }
      );

      // Remove password hash from returned details
      customer.password = undefined;

      return res.status (201).send ({
        customer,
        accessToken,
        expires_in: '24h',
      });
    } catch (error) {
      return res
        .status (409)
        .send ({error: handleUserErrors ('USR_04', 409, 'email')});
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
  static async login (req, res) {
    const {password, email} = req.body;

    const customer = await Customer.findOne ({where: {email}});

    if (!customer) {
      return res.status (404).send ({
        error: handleUserErrors ('USR_05', 404, 'email'),
      });
    }

    if (
      customer &&
      bcrypt.compareSync (password, customer.dataValues.password)
    ) {
      const accessToken = jwt.sign (
        {customer_id: customer.dataValues.customer_id},
        process.env.SECRET_KEY
      );

      customer.password = undefined;

      return res.status (200).send ({
        customer,
        accessToken,
        expires_in: '24h',
      });
    } else {
      return res.status (401).send ({
        error: handleUserErrors ('USR_01', 401, 'email/password'),
      });
    }
  }
}
