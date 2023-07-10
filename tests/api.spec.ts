import { expect } from "chai";
import request from "supertest";

import { startServer } from "../src/server";

const { app, server } = startServer(3001);

describe("GET /health", () => {
  it("Should respond with json and a value of OK", async () => {
    const response = await request(app).get("/health");
    expect(response.status).equal(200, "Status should be 200");
    expect(response.body.status).equal("OK", "Value is OK");
  });
});

server.close(); // Necessary otherwise mocha will not exit on its own
