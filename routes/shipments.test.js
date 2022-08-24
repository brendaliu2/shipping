"use strict";

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid request body", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zipcode: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });
});

describe("POST /", function () {
  test("invalid request body zipcode key", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({
      "error": {
        "message": [
          "instance is not allowed to have the additional property \"zip\"",
          "instance requires property \"zipcode\""
        ],
        "status": 400
      }
    });
  });
});

