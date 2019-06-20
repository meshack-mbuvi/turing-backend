const Customer = require ('../sequelize/models').Customer;
import {customError} from '../errors/index';

const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');

export class CustomerController {
  static async create (req, res) {
    try {
      const {
        body: {name, email, password, eve_phone, day_phone, mob_phone},
      } = req;

      const passwordHash = bcrypt.hashSync (password, 10);
      if (!name) {
        return res
          .status (400)
          .send ({error: customError ('USR_02', 400, 'name')});
      }

      if (!email) {
        return res
          .status (400)
          .send ({error: customError ('USR_02', 400, 'email')});
      }

      const customer = await Customer.create ({
        name,
        email,
        password: passwordHash,
        eve_phone: eve_phone || '',
        day_phone: day_phone || '',
        mob_phone: mob_phone || '',
      });

      const accessToken = jwt.sign (
        {customer_id: customer.id, name},
        process.env.SECRET_KEY,
        {
          expiresIn: '24h', // expires in 24 hours
        }
      );

      return res.status (201).send ({
        customer,
        accessToken,
        expires_in: '24h',
      });
    } catch (error) {
      return res
        .status (409)
        .send ({error: customError ('USR_04', 409, 'email')});
    }
  }

  static async login (req, res) {
    const {password, email} = req.body;

    const customer = await Customer.findOne ({where: {email}});
    if (customer && bcrypt.compareSync (password, customer.password)) {
      const accessToken = jwt.sign ({id: customer.id}, process.env.SECRET_KEY);

      customer.password = undefined;

      return res.status (200).send ({
        customer,
        accessToken,
        expires_in: '24h',
      });
    } else {
      return res.status (401).send ({
        error: customError ('USR_01', 401, 'email/password'),
      });
    }
  }
}
