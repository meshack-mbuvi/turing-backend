import map from 'lodash/map';
import models from '../src/sequelize/models/index';
export default async function truncate () {
  await models.sequelize.drop ();
  await models.sequelize.sync ();
  return await Promise.all (
    map (Object.keys (models), key => {
      if (['sequelize', 'Sequelize'].includes (key)) return null;
      return models[key].destroy ({where: {}, force: true});
    })
  );
}
