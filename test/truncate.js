import models from '../src/sequelize/models/index';
export default async function truncate () {
  await models.sequelize.sync ();
  return;
}
