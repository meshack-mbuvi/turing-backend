import {handleCategoryErrors, handleDepartmentErrors} from '../errors/index';
const Category = require ('../sequelize/models').Category;

export class CategoryController {
  /**
   * Retrieve all categories
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} categories
   */
  static async all (req, res) {
    const {query: {order = 'name,ASC', page = 1, limit = 10}} = req;

    const [orderField, ordering] = order.split (',');

    const setLimit = parseInt (limit, 10);
    const offset = page ? (parseInt (page) - 1) * limit : 0;

    const categories = await Category.findAll ({
      offset,
      limit: setLimit,
      order: [[orderField, ordering]],
    });
    return res.status (200).send ({
      count: categories.length,
      rows: categories,
    });
  }

  /**
   * Retrieve a category
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A single category
   */
  static async one (req, res) {
    const {params: {category_id}} = req;

    if (isNaN (category_id)) {
      return res
        .status (400)
        .send ({error: handleCategoryErrors ('CAT_01', 400, 'category_id')});
    }

    const category = await Category.findOne ({
      where: {
        category_id,
      },
    });

    if (!category) {
      return res
        .status (404)
        .send ({error: handleCategoryErrors ('CAT_02', 404, 'category_id')});
    }

    return res.status (200).send (category);
  }

  /**
   * Retrieve all categories in a given department
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} categories
   */
  static async categoryInDepartment (req, res) {
    const {params: {department_id}} = req;

    if (isNaN (department_id)) {
      return res.status (400).send ({
        error: handleDepartmentErrors ('DEP_01', 400, 'department_id'),
      });
    }

    const categories = await Category.findAll ({
      where: {
        department_id,
      },
    });

    if (!categories.length) {
      return res.status (404).send ({
        error: handleDepartmentErrors ('DEP_01', 400, 'department_id'),
      });
    }

    return res.status (200).send (categories);
  }
}
