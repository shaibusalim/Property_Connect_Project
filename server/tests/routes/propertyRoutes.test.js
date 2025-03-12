const request = require("supertest");
const app = require("../../server");

describe("Property Routes Tests", () => {
  it("should return 200 for GET /api/properties", async () => {
    const response = await request(app).get("/api/properties");
    expect(response.status).toBe(200);
  });

  it("should return 201 for POST /api/properties", async () => {
    const response = await request(app)
      .post("/api/properties")
      .send({
        title: "Luxury Villa",
        price: 500000,
        location: "Los Angeles",
        bedrooms: 4,
        bathrooms: 3,
        description: "A beautiful luxury villa",
        propertyType: "Villa",
      });
    expect(response.status).toBe(201);
  });

  // Add more tests for other routes
});