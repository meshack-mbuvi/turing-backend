import { createApp } from '../../src/lib/createApp';
import request from 'supertest';
import chai from 'chai';
import truncate from '../truncate';

const { expect } = chai;

describe('Shopping Cart tests', () => {
  let server;
  const BASE_URL = '/api/shoppingcart';

  before(async () => {
    await truncate();

    const app = await createApp();
    server = app.listen(3002);
  });

  after(async () => {
    await server.close();
  });

  describe('Shopping cart', () => {
    it('should generate a shopping cart id', async () => {
      const { body: { cart_id } } = await request(server).get(
    `${BASE_URL}/generateUniqueId`
   );
      expect(cart_id).to.be.a('string');
    });

    it('should add item to shopping cart', async () => {
      const { body } = await request(server).post(`${BASE_URL}/add`).send({
        product_id: 91,
        cart_id: 'sbdfbjkd',
        attributes: 'Red, L'
      });
      expect(body).to.be.an('array');
    });

    it('should get all items in the cart', async () => {
      const { body } = await request(server).get(`${BASE_URL}/sbdfbjkd`);
      expect(body).to.be.an('array');
    });

    it('should return total amount from cart', async () => {
      const { body: { total_amount } } = await request(server).get(
    `${BASE_URL}/totalAmount/sbdfbjkd`
   );
      expect(total_amount).to.be.a('number');
    });

    it('should update an item in shopping cart', async () => {
      const res = await request(server).get(`${BASE_URL}/sbdfbjkd`);
      const [item] = res.body;
      const { body } = await request(server)
    .put(`${BASE_URL}/update/${item.item_id}`)
    .send({
      quantity: 3
    });
      const [newItem] = body;
      expect(newItem.quantity).to.equal(3);
    });

    it('should get error if quantity is less than 1', async () => {
      const res = await request(server).get(`${BASE_URL}/sbdfbjkd`);
      const [item] = res.body;
      const { status } = await request(server)
    .put(`${BASE_URL}/update/${item.item_id}`)
    .send({
      quantity: 0
    });
      expect(status).to.equal(400);
    });

    it('should get error if quantity is missing', async () => {
      const res = await request(server).get(`${BASE_URL}/sbdfbjkd`);
      const [item] = res.body;
      const { status } = await request(server).put(
    `${BASE_URL}/update/${item.item_id}`
   );
      expect(status).to.equal(400);
    });

    it('should remove item from cart', async () => {
      const { body } = await request(server).get(`${BASE_URL}/sbdfbjkd`);
      const [item] = body;
      const { body: { message } } = await request(server).delete(
    `${BASE_URL}/removeProduct/${item.item_id}`
   );
      expect(message).to.be.equal('item removed from cart');
    });

    it('should remove all items from the cart', async () => {
      const { body } = await request(server).delete(`${BASE_URL}/empty/sbdfbjkd`);
      expect(body).to.be.empty;
    });
  });
});
