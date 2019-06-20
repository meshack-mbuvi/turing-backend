import {
  categoryCustomError,
  departCustomError,
  paginationCustomError,
} from '../errors/index';
const Category = require ('../sequelize/models').Category;

export class CategoryController {
  static async all (req, res) {
    const {query: {order = 'name,ASC', page = 0, limit = 10}} = req;

    const allowedFields = ['name', 'description'];
    const allowedVal = ['DESC', 'ASC'];

    const [orderField, ordering] = order.split (',');

    if (
      !allowedFields.includes (orderField) ||
      !allowedVal.includes (ordering)
    ) {
      return res
        .status (400)
        .send ({error: paginationCustomError ('PAG_01', 400, 'order')});
    }
    if (isNaN (page)) {
      return res
        .status (400)
        .send ({error: paginationCustomError ('PAG_01', 400, 'page')});
    }
    if (isNaN (limit)) {
      return res
        .status (400)
        .send ({error: paginationCustomError ('PAG_01', 400, 'limit')});
    }

    const setLimit = parseInt (limit, 10);
    const offset = page ? parseInt (page) * limit : 0;

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

  static async one (req, res) {
    const {params: {category_id}} = req;
    if (isNaN (category_id)) {
      return res
        .status (400)
        .send ({error: categoryCustomError ('CAT_01', 400, 'category_id')});
    }
    const category = await Category.findOne ({
      where: {
        category_id,
      },
    });

    if (!category) {
      return res
        .status (404)
        .send ({error: categoryCustomError ('CAT_02', 404, 'category_id')});
    }

    return res.status (200).send (category);
  }

  static async categoryInDepartment (req, res) {
    const {params: {department_id}} = req;

    if (isNaN (department_id)) {
      return res
        .status (400)
        .send ({error: departCustomError ('DEP_01', 400, 'department_id')});
    }
    const categories = await Category.findAll ({
      where: {
        department_id,
      },
    });

    if (!categories.length) {
      return res
        .status (404)
        .send ({error: departCustomError ('DEP_01', 400, 'department_id')});
    }

    return res.status (200).send (categories);
  }
}
