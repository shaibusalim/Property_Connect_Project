const { Property } = require("../../models/Property");
const sequelize = require("../../config/Database");

describe("Property Model Tests", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Sync the database
  });

  it("should create a new property", async () => {
    const propertyData = {
      title: "Luxury Villa",
      price: 500000,
      location: "Los Angeles",
      bedrooms: 4,
      bathrooms: 3,
      description: "A beautiful luxury villa",
      propertyType: "Villa",
    };

    const property = await Property.create(propertyData);
    expect(property.title).toBe("Luxury Villa");
    expect(property.price).toBe(500000);
  });

  // Add more tests for model validations, associations, etc.
});