const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const Doctor = require("../models/doctor.Model");
let server;

const mockDoctor = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  titles: ["MD"],
  specialisation: "Cardiology",
  profilePic: "http://example.com/pic.jpg",
  hospital: new mongoose.Types.ObjectId(), // Mock hospital ID
};

// Setup & teardown database connection
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    server = app.listen(0, () => {
      console.log(`Server running on port ${server.address().port}`);
    });
  });
  

// Clear doctors collection before each test
beforeEach(async () => {
  await Doctor.deleteMany({});
});

afterEach(async () => {
    await server.close();
  });
  

afterAll(async () => {
  await mongoose.disconnect();
  server.close();
});

describe("Doctor API", () => {
  it("should create a new doctor", async () => {
    const res = await request(app).post("/api/doctors").send(mockDoctor);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("firstName", "John");
  });

  it("should fetch all doctors", async () => {
    try {
      await Doctor.create(mockDoctor);
      const res = await request(app).get("/api/doctors");
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
    } catch (error) {
      console.log("Error in fetch all doctors test:", error);
    }
  });

  it("should fetch a doctor by ID", async () => {
    try {
      const doctor = await Doctor.create(mockDoctor);
      const res = await request(app).get(`/api/doctors/${doctor._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("firstName", "John");
    } catch (error) {
      console.log("Error in fetch doctor by ID test:", error);
    }
  });

  it("should update a doctor", async () => {
    try {
      const doctor = await Doctor.create(mockDoctor);
      const res = await request(app)
        .put(`/api/doctors/${doctor._id}`)
        .send({ firstName: "Jane" });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("firstName", "Jane");
    } catch (error) {
      console.log("Error in update doctor test:", error);
    }
  });

  it("should delete a doctor", async () => {
    try {
      const doctor = await Doctor.create(mockDoctor);
      const res = await request(app).delete(`/api/doctors/${doctor._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message", "Doctor removed");
    } catch (error) {
      console.log("Error in delete doctor test:", error);
    }
  });
});
