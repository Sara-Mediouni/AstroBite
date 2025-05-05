const request = require("supertest");
const { app, connectDB } = require("../food-service/index");
const chai = require("chai");
const { default: mongoose } = require("mongoose");
const path = require("path");
const expect = chai.expect;

let createdFoodId = null;

describe("FOOD TEST", function () {
  before(async () => {
    await connectDB();
  });

  after(async () => {
    await mongoose.connection.close();
  });
  it("POST /add", async () => {
    console.log("Test add food");

    console.log("add food called");
    const res = await request(app)
      .post("/food/")
      .field("name", "Pizza")
      .field("price", "12.5")
      .field("description", "vegeterian pizza")
      .field("category", "Pizza")
      .attach(
        "image",
        path.resolve(__dirname, "../food-service/uploads/coke.png")
      );

    expect(res.status).to.equal(201);

    expect(res.body).to.have.property("success", true);
    expect(res.body).to.have.property("newFood");
  });

  it("GET /", async () => {
    const res = await request(app)
      .get(`/food/`)
      .set("Content-Type", "application/json");

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("success", true);
    expect(res.body).to.have.property("foods").that.is.an("array");

    createdFoodId = res.body.foods.find((food) => food.name === "Pizza")?._id;
    expect(createdFoodId).to.exist;
  });
  it("PUT /:id", async () => {
    console.log("Test update food");
    const body = {
      name: "pizza",
      price: "15",
    };
    console.log("update food called");
    const res = await request(app).put(`/food/${createdFoodId}`).send(body);

    expect(res.status).to.equal(200);

    expect(res.body).to.have.property("food");
  });
  it("Returns all categories", async () => {
    console.log("Test food categories");

    const res = await request(app)
      .get(`/food/getallcategories`)
      .set("Content-Type", "application/json");

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("success", true);

    expect(res.body).to.have.property("uniqueCategories").that.is.an("array");
  });
  it("Returns Category Pizza", async () => {
    console.log("Test food category Pizza");

    const category = "Pizza";
    const res = await request(app)
      .get(`/food/category/${category}`)
      .set("Content-Type", "application/json");

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("success", true);

    expect(res.body).to.have.property("foods").that.is.an("array");
  });
  it("Returns Food by id", async () => {
    const res = await request(app)
      .get(`/food/Food/${createdFoodId}`)
      .set("Content-Type", "application/json");

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("success", true);
    expect(res.body).to.have.property("food");
  });
  it("Deletes Food by id", async () => {
    const res = await request(app)
      .delete(`/food/${createdFoodId}`)
      .set("Content-Type", "application/json");

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("success", true);
  });
});
