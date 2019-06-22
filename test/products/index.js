import {createApp} from '../../src/lib/createApp';
import request from 'supertest';
import chai from 'chai';
import truncate from '../truncate';

const {expect} = chai;

describe ('Product tests', () => {
  let server;
  const BASE_URL = '/api/products';

  before (async () => {
    await truncate ();

    const app = await createApp ();
    server = app.listen (3002);
  });

  after (async () => {
    await server.close ();
  });

  describe ('Get /api/products', () => {
    it ('should retrieve all products', async () => {
      const {body: {rows}} = await request (server).get (`${BASE_URL}`);
      expect (rows.length).to.equal (3);
    });

    it ('should handle pagination', async () => {
      const {body: {rows}} = await request (server).get (
        `${BASE_URL}/?limit=2&order=name,ASC&page=1`
      );
      expect (rows.length).to.equal (2);
    });
  });

  describe ('Get /api/product/:product_id', () => {
    it ('should retrieve a single product', async () => {
      const {body: {product_id}} = await request (server).get (
        `${BASE_URL}/91`
      );
      expect (product_id).to.equal (91);
    });

    it ('should return error for non existing product', async () => {
      const {status} = await request (server).get (`${BASE_URL}/10000`);
      expect (status).to.equal (404);
    });
  });

  describe ('Get /api/product/inCategory/:category_id', () => {
    it ('should retrieve all products in a category', async () => {
      const {body: {rows}} = await request (server).get (
        `${BASE_URL}/inCategory/1`
      );
      expect (rows.length).to.equal (3);
    });

    it ('should return error if category_id is not a number', async () => {
      const {status} = await request (server).get (`${BASE_URL}/inCategory/f`);
      expect (status).to.equal (400);
    });
  });

  describe ('Get /api/product/inDepartment/:department_id', () => {
    it ('should retrieve all products in a department', async () => {
      const {body: {rows}} = await request (server).get (
        `${BASE_URL}/inDepartment/1`
      );
      expect (rows.length).to.equal (3);
    });

    it ('should return error if department_id is not a number', async () => {
      const {status} = await request (server).get (
        `${BASE_URL}/inDepartment/f`
      );
      expect (status).to.equal (400);
    });
  });

  describe ('Get /api/product/:product_id/locations', () => {
    it ('should product locations', async () => {
      const {body: {category_id}} = await request (server).get (
        `${BASE_URL}/91/locations`
      );
      expect (category_id).to.equal (1);
    });
  });

});
