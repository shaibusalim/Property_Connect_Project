// tests/controllers/propertyController.test.js
const request = require("supertest");
const app = require("../../server");
const Property = require("../../models/Property");

jest.mock("../../models/Property");

describe("Property Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/properties", () => {
    it("should fetch all properties", async () => {
      // Mock a successful database response
      Property.findAll.mockResolvedValue([
        { id: 1, title: "Beautiful Apartment", price: 200000, location: "New York" },
      ]);

      const response = await request(app).get("/api/properties");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { id: 1, title: "Beautiful Apartment", price: 200000, location: "New York" },
      ]);
    });

    it("should handle errors when fetching properties", async () => {
      // Mock a database error
      Property.findAll.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/api/properties");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to fetch properties" });
    });
  });

  describe("POST /api/properties", () => {
    it("should add a new property", async () => {
      // Mock a successful database response
      const newProperty = {
        id: 1,
        title: "Luxury Villa",
        price: 500000,
        location: "Los Angeles",
        bedrooms: 4,
        bathrooms: 3,
        description: "A beautiful luxury villa",
        propertyType: "Villa",
        image: "uploads/image-12345.jpg",
      };
      Property.create.mockResolvedValue(newProperty);

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
      expect(response.body).toEqual(newProperty);
    });

    it("should handle errors when adding a property", async () => {
      // Mock a database error
      Property.create.mockRejectedValue(new Error("Database error"));

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

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to add property" });
    });
  });

// Test for POST /api/contact (contactSeller)
describe("POST /api/contact", () => {
    it("should notify the seller", async () => {
      const response = await request(app)
        .post("/api/contact")
        .send({ propertyId: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Seller for property 1 has been notified!",
      });
    });

    it("should handle errors when contacting the seller", async () => {
      // Simulate an error by throwing an exception
      jest.spyOn(Property, "findOne").mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .post("/api/contact")
        .send({ propertyId: 1 });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to contact seller" });
    });
  });

});




  