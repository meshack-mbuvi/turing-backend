import {
  handleCategoryErrors,
  handleProductErrors,
  handleDepartmentErrors,
} from '../errors/index';

const Sequelize = require ('sequelize');
const Op = Sequelize.Op;

const Product = require ('../sequelize/models').Product;
const Category = require ('../sequelize/models').Category;
const Department = require ('../sequelize/models').Department;

export class ProductController {
  /**
   * Retrieve all products
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} All products
   */

  static async all (req, res) {
    const {query: {order = 'name,ASC', page = 1, limit = 10}} = req;

    const setLimit = parseInt (limit, 10);
    const offset = page ? (parseInt (page) - 1) * limit : 0;
    const [orderField, ordering] = order.split (',');

    const products = await Product.findAll ({
      offset,
      limit: setLimit,
      order: [[orderField, ordering]],
    });

    return res.status (200).send ({
      count: products.length,
      rows: products,
    });
  }

  /**
   * Search a product whose name or description has text matching given
   * search string
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} products matching given search criteria
   */
  static async search (req, res) {
    const {query: {query_string}} = req;
    const {query: {order = 'name,ASC', page = 1, limit = 10}} = req;

    const setLimit = parseInt (limit, 10);
    const offset = page ? (parseInt (page) - 1) * limit : 0;
    const [orderField, ordering] = order.split (',');

    const products = await Product.findAll ({
      offset,
      limit: setLimit,
      order: [[orderField, ordering]],
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: '%' + query_string + '%',
            },
          },
          {
            description: {
              [Op.like]: '%' + query_string + '%',
            },
          },
        ],
      },
    });

    return res.status (200).send ({
      count: products.length,
      rows: products,
    });
  }

  /**
   * Retrieve a single product
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A single product
   */

  static async one (req, res) {
    const {params: {product_id}} = req;

    // product_id should be a number
    if (isNaN (product_id)) {
      return res
        .status (400)
        .send ({error: handleProductErrors ('PROD_01', 400, 'product_id')});
    }

    const product = await Product.findOne ({
      where: {
        product_id,
      },
    });

    if (!product) {
      return res
        .status (404)
        .send ({error: handleProductErrors ('PROD_02', 404, 'product_id')});
    }

    return res.status (200).send (product);
  }

  /**
   * Retrieve products in a given category
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} product in a given category
   */
  static async productInCategory (req, res) {
    const {
      params: {category_id},
      query: {order = 'name,ASC', page = 1, limit = 10},
    } = req;

    // Get order key and value
    const [orderField, ordering] = order.split (',');

    if (isNaN (category_id)) {
      return res
        .status (400)
        .send ({error: handleCategoryErrors ('CAT_01', 400, 'category_id')});
    }

    const setLimit = parseInt (limit, 10);
    const offset = page ? (parseInt (page) - 1) * limit : 0;

    const products = await Product.findAll ({
      offset,
      limit: setLimit,
      order: [[orderField, ordering]],
      include: [
        {
          model: Category,
          where: {
            category_id,
          },
          attributes: [],
        },
      ],
    });

    if (!products.length) {
      return res
        .status (404)
        .send ({error: handleCategoryErrors ('CAT_02', 404, 'category_id')});
    }

    return res.status (200).send ({
      count: products.length,
      rows: products,
    });
  }

  /**
   * Retrieve products in a given department
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} product in a given department
   */
  static async productInDepartment (req, res) {
    const {
      params: {department_id},
      query: {order = 'name,ASC', page = 1, limit = 10},
    } = req;

    // Get order key and value
    const [orderField, ordering] = order.split (',');

    if (isNaN (department_id)) {
      return res.status (400).send ({
        error: handleDepartmentErrors ('DEP_01', 400, 'department_id'),
      });
    }

    const setLimit = parseInt (limit, 10);
    const offset = page ? (parseInt (page) - 1) * limit : 0;

    const products = await Product.findAll ({
      offset,
      limit: setLimit,
      order: [[orderField, ordering]],
      include: [
        {
          model: Category,
          attributes: [],
          include: [
            {
              model: Department,
              attributes: [],
              where: {
                department_id,
              },
            },
          ],
        },
      ],
    });

    if (!products.length) {
      return res.status (404).send ({
        error: handleDepartmentErrors ('DEP_02', 404, 'department_id'),
      });
    }

    return res.status (200).send ({
      count: products.length,
      rows: products,
    });
  }

  /**
   * Get product location
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} product location details
   */
  static async productLocation (req, res) {
    const {params: {product_id}} = req;

    if (isNaN (product_id)) {
      return res.status (400).send ({
        error: handleProductErrors ('PROD_01', 400, 'product_id'),
      });
    }

    const products = await Product.findOne ({
      where: {
        product_id,
      },
      include: [
        {
          model: Category,
          include: [
            {
              model: Department,
            },
          ],
        },
      ],
    });

    if (!products) {
      return res.status (404).send ({
        error: handleProductErrors ('PROD_02', 404, 'product_id'),
      });
    }

    const {Categories: [details]} = products;

    const {
      category_id,
      department_id,
      name: category_name,
      Department: {name: department_name},
    } = details;

    return res.status (200).send ({
      category_id,
      category_name,
      department_id,
      department_name,
    });
  }
}
