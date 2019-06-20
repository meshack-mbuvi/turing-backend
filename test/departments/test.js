import {createApp} from '../../src/lib/createApp';
import request from 'supertest';
import chai from 'chai';
import truncate from '../truncate';

const {expect} = chai;

describe ('Department tests', () => {
  let server;
  const BASE_URL = '/api/departments';

  before (async () => {
    await truncate ();

    const app = await createApp ();
    server = app.listen (3002);
  });

  after (async () => {
    await server.close ();
  });

  describe ('Get /api/departments', () => {
    it ('should retrieve all departments', async () => {
      const res = await request (server).get (`${BASE_URL}`);
      expect (res.body.length).to.equal (3);
    });

    it ('should retrieve a single department', async () => {
      const {body: {department_id}} = await request (server).get (
        `${BASE_URL}/1`
      );
      expect (department_id).to.equal (1);
    });

    it ('should return error if product_id is not a number', async () => {
      const {status} = await request (server).get (`${BASE_URL}/f`);
      expect (status).to.equal (400);
    });

    it ('should return error for non existing department', async () => {
      const {status} = await request (server).get (`${BASE_URL}/10000`);
      expect (status).to.equal (404);
    });
  });
});
