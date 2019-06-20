import {departCustomError} from '../errors/departmentErrors';
const Department = require ('../sequelize/models').Department;

export class DepartmentController {
  static async all (req, res) {
    const departments = await Department.findAll ();
    return res.status (200).send (departments);
  }

  static async one (req, res) {
    const {params: {department_id}} = req;
    if (isNaN (department_id)) {
      return res
        .status (400)
        .send ({error: departCustomError ('DEP_01', 400, 'id')});
    }
    const department = await Department.findOne ({
      where: {
        department_id,
      },
    });

    if (!department) {
      return res
        .status (404)
        .send ({error: departCustomError ('DEP_02', 404, 'id')});
    }

    return res.status (200).send (department);
  }
}
