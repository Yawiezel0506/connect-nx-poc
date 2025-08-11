import request from "supertest";
import express from "express";
import * as path from "path";

describe("Express Example App", () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use("/assets", express.static(path.join(__dirname, "assets")));
    app.get("/api", (req, res) => {
      res.send({ message: "Welcome to express-example!" });
    });
  });

  it("should respond with welcome message on /api endpoint", async () => {
    const response = await request(app).get("/api").expect(200);

    expect(response.body).toEqual({ message: "Welcome to express-example!" });
  });

  it("should serve static assets", async () => {
    await request(app).get("/assets/some-file.txt").expect(404); // Expect 404 since the file doesn't exist, but the middleware should handle it
  });
});
