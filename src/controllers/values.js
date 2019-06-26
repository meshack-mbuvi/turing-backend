import { handleAttributeErrors } from "../errors/index";
const AttributeValue = require("../sequelize/models").AttributeValue;

export class AttributeValueController {
  /**
   * Retrieve all attribute values
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} attribute values
   */
  static async all(req, res) {
    const values = await AttributeValue.findAll({});

    if (!values.length) {
      return res.status(404).send({ error: handleAttributeErrors("PAT_02", 404, "attribute_id") });
    }

    return res.status(200).send(values);
  }
}
