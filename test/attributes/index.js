import { createApp } from "../../src/lib/createApp";
import request from "supertest";
import chai from "chai";
import truncate from "../truncate";

const { expect } = chai;

describe("Attribute tests", () => {
  let server;
  const BASE_URL = "/api/products";

  before(async () => {
    await truncate();

    const app = await createApp();
    server = app.listen(3002);
  });

  after(async () => {
    await server.close();
  });

  describe("Get /api/attributes", () => {
    const URL = "/api/attributes";

    it("should get all attributes", async () => {
      const { status } = await request(server).get(`${URL}`);
      expect(status).to.equal(200);
    });

    it("should get an attribute", async () => {
      const { status } = await request(server).get(`${URL}/1`);
      expect(status).to.equal(200);
    });

    it("should get all attributes in a product", async () => {
      const { status } = await request(server).get(`${URL}/inProduct/91`);
      expect(status).to.equal(200);
    });

    it("should respond appropriately for attribute not found", async () => {
      const { status } = await request(server).get(`${URL}/100`);
      expect(status).to.equal(404);
    });
  });
});
