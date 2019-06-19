import {createApp} from '../src/lib/createApp';
import request from 'supertest';
import chai from 'chai';

const {expect} = chai;

describe ('All tests', () => {
  let server;
  const BASE_URL = '/api/users';

  before (async () => {
    const app = await createApp ();
    server = app.listen (3002);
  });

  after (async () => {
    await server.close ();
  });

  describe ('Tets', () => {
    it ('should run tests', async () => {
      expect (true).to.equal (true);
    });
  });
});
