import {paginationCustomError} from '../errors/index';

export const handlePaginationErrors = (req, res, next) => {
  const {query: {order = 'name,ASC', page = 1, limit = 10}} = req;

  const allowedFields = ['name', 'description'];
  const allowedVal = ['DESC', 'ASC'];

  const [orderField, ordering] = order.split (',');

  if (!allowedFields.includes (orderField) || !allowedVal.includes (ordering)) {
    return res
      .status (400)
      .send ({error: paginationCustomError ('PAG_01', 400, 'order')});
  }
  if (page < 1 || isNaN (page)) {
    return res
      .status (400)
      .send ({error: paginationCustomError ('PAG_02', 400, 'page')});
  }

  if (isNaN (limit)) {
    return res
      .status (400)
      .send ({error: paginationCustomError ('PAG_03', 400, 'limit')});
  }
  next ();
};
