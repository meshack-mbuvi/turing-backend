import { handleDepartmentErrors } from '../errors/index';
const Department = require('../sequelize/models').Department;

export class DepartmentController {
 /**
   * Retrieve all departments
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} departments
   */
  static async all (req, res) {
    const departments = await Department.findAll();
    return res.status(200).send(departments);
  }

 /**
   * Retrieve a single department
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} a single department
   */
  static async one (req, res) {
    const { params: { department_id } } = req;

    if (isNaN(department_id)) {
      return res
    .status(400)
    .send({ error: handleDepartmentErrors('DEP_01', 400, 'department_id') });
    }

    const department = await Department.findOne({
      where: {
        department_id
      }
    });

    if (!department) {
      return res
    .status(404)
    .send({ error: handleDepartmentErrors('DEP_02', 404, 'department_id') });
    }

    return res.status(200).send(department);
  }
}
