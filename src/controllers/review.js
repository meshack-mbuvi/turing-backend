import { handleProductErrors, handleReviewErrors } from '../errors/index';
const Review = require('../sequelize/models').Review;
const Product = require('../sequelize/models').Product;

export class ReviewController {
 /**
   * Retrieve all reviews for a given product
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} project reviews
   */
  static async all (req, res) {
    const { params: { product_id } } = req;

    if (isNaN(product_id)) {
      return res
    .status(400)
    .send({ error: handleProductErrors('PROD_01', 400, 'product_id') });
    }

    const reviews = await Review.findAll({
      where: {
        product_id
      }
    });

    return res.status(200).send(reviews);
  }

 /**
   * Post a review for a given product
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} created review
   */
  static async create (req, res) {
    const {
   params: { product_id },
   user: { customer_id },
   body: { review, rating }
  } = req;

    if (!rating || !rating) {
      return res
    .status(400)
    .send({ error: handleReviewErrors('REV_01', 400, 'rating/review') });
    }

    if (isNaN(product_id)) {
      return res
    .status(400)
    .send({ error: productCustomError('PROD_01', 400, 'product_id') });
    }

    const product = await Product.findOne({
      where: {
        product_id
      }
    });

  // A non existing product cannot be reviewed
    if (!product) {
      return res
    .status(404)
    .send({ error: handleProductErrors('PROD_02', 404, 'product_id') });
    }

    let reviews = await Review.findOne({
      where: {
        product_id,
        customer_id
      }
    });

  // User should not be allowed to review a product more than once
    if (reviews) {
      return res
    .status(409)
    .send({ error: handleReviewErrors('REV_02', 409, 'product_id') });
    }

    reviews = await Review.create({
      customer_id,
      review,
      rating,
      created_on: Date.now(),
      product_id: parseInt(product_id, 10)
    });

    return res.status(201).send(reviews);
  }
}
