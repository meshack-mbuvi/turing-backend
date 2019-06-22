import {createApp} from '../../src/lib/createApp';
import request from 'supertest';
import chai from 'chai';
import truncate from '../truncate';
import models from '../../src/sequelize/models/index';

// const Customer = require ('./src/sequelize/models').Customer;

const {expect} = chai;

describe ('Customer tests', () => {
  let server;
  const BASE_URL = '/api/customers';

  before (async () => {
    await truncate ();
    await models.Customer.destroy ({where: {}});

    const app = await createApp ();
    server = app.listen (3002);
  });

  after (async () => {
    await server.close ();
  });

  describe ('Post /api/customers', () => {
    it ('should create user account', async () => {
      const {status} = await request (server).post (`${BASE_URL}`).send ({
        name: 'testsre',
        password: 'test12rterte',
        email: 'test3mdbsjdfg@test.com',
      });
      expect (status).to.equal (201);
    });

    it ('should not create user account more than once', async () => {
      const data = {
        name: 'test',
        password: 'test12',
        email: 'test0@test.com',
      };
      await request (server).post (`${BASE_URL}`).send (data);
      const {body, status} = await request (server)
        .post (`${BASE_URL}`)
        .send (data);
      expect (status).to.equal (409);
    });

    it ('should not create user account with empty name', async () => {
      const {status} = await request (server).post (`${BASE_URL}`).send ({
        name: '',
        password: 'test12',
        email: 'test2@test.com',
      });
      expect (status).to.equal (400);
    });
  });

  describe ('Post /api/customers/login', () => {
    it ('should login user', async () => {
      await request (server).post (`${BASE_URL}`).send ({
        name: 'testsre',
        password: 'test12rterte',
        email: 'test3mdbsjdfg@test.com',
      });
      const {body, status} = await request (server)
        .post (`${BASE_URL}/login`)
        .send ({
          name: 'testsre',
          password: 'test12rterte',
          email: 'test3mdbsjdfg@test.com',
        });
      expect (status).to.equal (200);
    });

    it ('should not login user with invalid details', async () => {
      const data = {
        password: 'test12132456',
        email: 'test0@test.com',
      };
      const {body, status} = await request (server)
        .post (`${BASE_URL}/login`)
        .send (data);
      expect (status).to.equal (401);
    });
  });

  describe ('Product reviews /api/products/:product_id/reviews', () => {
    const url = `/api/products`;
    let token;
    beforeEach (async () => {
      await request (server).post (`${BASE_URL}`).send ({
        name: 'testsre',
        password: 'test12rterte',
        email: 'test3mdbsjdfg@test.com',
      });

      const {body: {accessToken}} = await request (server)
        .post (`${BASE_URL}/login`)
        .send ({
          password: 'test12rterte',
          email: 'test3mdbsjdfg@test.com',
        });
      token = accessToken;
    });

    it ('should post reviews for a given product', async () => {
      const {body: {review}} = await request (server)
        .post (`${url}/91/reviews`)
        .set ('Authorization', `Bearer ${token}`)
        .send ({
          rating: 5,
          review: 'Its good',
        });

      expect (review).to.equal ('Its good');
    });

    it ('should not post reviews for a product already reviewed', async () => {
      await request (server)
        .post (`${url}/65/reviews`)
        .set ('Authorization', `Bearer ${token}`)
        .send ({
          rating: 5,
          review: 'Its good too',
        });

      const {status} = await request (server)
        .post (`${url}/65/reviews`)
        .set ('Authorization', `Bearer ${token}`)
        .send ({
          rating: 5,
          review: 'Its good',
        });

      expect (status).to.equal (409);
    });

    it ('should retrieve all reviews for a given product', async () => {
      const {status} = await request (server).get (`${url}/91/reviews`);
      expect (status).to.equal (200);
    });
  });
});
