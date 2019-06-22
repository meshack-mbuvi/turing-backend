import {createApp} from '../../src/lib/createApp';
import request from 'supertest';
import chai from 'chai';
import truncate from '../truncate';

const {expect} = chai;

describe ('Category tests', () => {
  let server;
  const BASE_URL = '/api/categories';

  before (async () => {
    await truncate ();

    const app = await createApp ();
    server = app.listen (3002);
  });

  after (async () => {
    await server.close ();
  });

  describe ('Get /api/categories', () => {
    it ('should retrieve all categories', async () => {
      const {body: {rows}} = await request (server).get (`${BASE_URL}`);
      expect (rows.length).to.equal (3);
    });

    it ('should retrieve a single category', async () => {
      const {body: {department_id}} = await request (server).get (
        `${BASE_URL}/1`
      );
      expect (department_id).to.equal (1);
    });

    it ('should handle pagination', async () => {
      const {body: {rows}} = await request (server).get (
        `${BASE_URL}/?limit=2&order=name,ASC&page=1`
      );
      expect (rows.length).to.equal (2);
    });

    it ('should return error if category_id is not a number', async () => {
      const {status} = await request (server).get (`${BASE_URL}/f`);
      expect (status).to.equal (400);
    });

    it ('should return error for non existing category', async () => {
      const {status} = await request (server).get (`${BASE_URL}/10000`);
      expect (status).to.equal (404);
    });
  });

  describe ('Get /api/categories/inDepartment/:department_id', () => {
    it ('should retrieve all categories in a department', async () => {
      const {body} = await request (server).get (`${BASE_URL}/inDepartment/1`);
      expect (body.length).to.equal (2);
    });

    it ('should return error if department_id is not a number', async () => {
      const {status} = await request (server).get (
        `${BASE_URL}/inDepartment/f`
      );
      expect (status).to.equal (400);
    });

    it ('should return error for non existing department', async () => {
      const {status} = await request (server).get (
        `${BASE_URL}/inDepartment/10000`
      );
      expect (status).to.equal (404);
    });
  });
});
