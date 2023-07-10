import { expect } from "chai";
import request from "supertest";
import { config } from "dotenv";
config();

import { startServer } from "../src/server";
import { IncomingMessage, Server, ServerResponse } from "http";

describe("API Tests", () => {
  let app: Express.Application;
  let server: Server<typeof IncomingMessage, typeof ServerResponse>;

  before((done) => {
    // Start the server and obtain the app and server instances
    const serverInstance = startServer(3001);
    app = serverInstance.app;
    server = serverInstance.server;

    // Wait for the server to start before proceeding
    server.on("listening", () => {
      done();
    });
  });

  after((done) => {
    // Close the server after all tests are completed
    server.close(() => {
      done();
    });
  });

  describe("GET /health", () => {
    it("Should respond with json and a value of OK", async () => {
      const response = await request(app).get("/health");
      expect(response.status).equal(200, "Status should be 200");
      expect(response.body.status).equal("OK", "Value is OK");
    });
  });

  describe("GET /v1/references", () => {
    it("should return a valid response with an array of elements", async () => {
      const response = await request(app).get("/v1/references");
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
    });
  });

  describe("GET /v1/references/:type", () => {
    it("should return a valid response with an array of elements", async () => {
      const res = await request(app).get("/v1/references/business-model");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });

  describe("GET /v1/references/:type - invalid type", () => {
    it("should return an error specifying the type is unknown", async () => {
      const res = await request(app).get("/v1/references/unknowntype");
      expect(res.status).to.equal(400);
      expect(res.body)
        .to.be.an("object")
        .that.has.property("error", "Unknown Reference Type");
    });
  });

  describe("POST /v1/references/:type", () => {
    it("should successfully create a reference with type 'roles'", async () => {
      const payload = {
        title: "TEST Role",
        roleDefinitions: ["Role 1", "Role 2", "Role 3"],
        responsibilitiesAndObligations: ["Responsibility 1", "Obligation 1"],
        descriptions: [{ "@language": "en", "@value": "Definition 1" }],
      };

      const res = await request(app)
        .post("/v1/references/roles")
        .send(payload)
        .set("Content-Type", "application/json");

      expect(res.status).to.equal(201);
    });

    it("should successfully create a reference with type 'business-model'", async () => {
      const payload = {
        title: "TEST Business Model",
        definitions: [
          { "@language": "en", "@value": "Description" },
          { "@language": "fr", "@value": "Description" },
        ],
      };

      const res = await request(app)
        .post("/v1/references/business-model")
        .send(payload)
        .set("Content-Type", "application/json");

      expect(res.status).to.equal(201);
    });
  });
});
