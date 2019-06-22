import {handleAttributeErrors, handleProductErrors} from '../errors/index';
const Attribute = require ('../sequelize/models').Attribute;
const AttributeValue = require ('../sequelize/models').AttributeValue;
const Product = require ('../sequelize/models').Product;

export class AttributeController {
  /**
   * Retrieve all attributes
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} attributes
   */
  static async all (req, res) {
    const attributes = await Attribute.findAll ({});
    return res.status (200).send (attributes);
  }

  /**
   * Retrieve a attribute
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A single attribute
   */
  static async one (req, res) {
    const {params: {attribute_id}} = req;

    if (isNaN (attribute_id)) {
      return res
        .status (400)
        .send ({error: handleAttributeErrors ('PAT_01', 400, 'attribute_id')});
    }

    const attribute = await Attribute.findOne ({
      where: {
        attribute_id,
      },
    });

    if (!attribute) {
      return res
        .status (404)
        .send ({error: handleAttributeErrors ('PAT_02', 404, 'attribute_id')});
    }

    return res.status (200).send (attribute);
  }

  /**
   * Retrieve all attribute in a products
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} product attributes
   */
  static async attributesInProduct (req, res) {
    const {params: {product_id}} = req;

    if (isNaN (product_id)) {
      return res
        .status (400)
        .send ({error: handleProductErrors ('PROD_01', 400, 'product_id')});
    }

    const attributes = await Product.findOne ({
      where: {
        product_id,
      },
      include: [
        {
          model: AttributeValue,
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!attributes) {
      return res
        .status (404)
        .send ({error: handleProductErrors ('PROD_02', 404, 'product_id')});
    }

    const {AttributeValues} = attributes;

    return res.status (200).send (AttributeValues);
  }
}
