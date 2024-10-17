const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const Appointment = require("../models/appointmentModel");
let server;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  server = app.listen(5001, () => {
    console.log("Server running on port 5001");
  });
});

beforeEach(async () => {
  await Appointment.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  server.close();
});

describe("Appointment API", () => {
  // Positive Test Case: Valid data for appointment creation
  it("should create a new appointment", async () => {
    const res = await request(app).post("/api/appointments").send({
      userName: "John Doe",
      contactNumber: "0745878787",
      age: 30,
      doctor: "Dr. Smith",
      date: "2024-10-20",
      time: "14:00",
      category: "Consultation",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("userName", "John Doe");
    expect(res.body).toHaveProperty("contactNumber", "0745878787");
  });

  // Negative Test Case: Missing required fields (userName) in appointment creation
  it("should return 400 for invalid appointment creation data", async () => {
    const res = await request(app).post("/api/appointments").send({
      contactNumber: "0745878787",
      age: 30,
      doctor: "Dr. Smith",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  // Positive Test Case: Fetching all appointments
  it("should fetch all appointments", async () => {
    await Appointment.create({
      userName: "Alice Johnson",
      contactNumber: "5678901234",
      age: 35,
      doctor: "Dr. Smith",
      date: "2024-12-15",
      time: "15:30",
      category: "Consultation",
    });

    const res = await request(app).get("/api/appointments");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Positive Test Case: Fetching an existing appointment by ID
  it("should fetch an appointment by ID", async () => {
    const appointment = await Appointment.create({
      userName: "Mark Taylor",
      contactNumber: "1234567890",
      age: 45,
      doctor: "Dr. Johnson",
      date: "2024-10-25",
      time: "09:00",
      category: "Consultation",
    });

    const res = await request(app).get(`/api/appointments/${appointment._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("userName", "Mark Taylor");
  });

  // Negative Test Case: Fetching a non-existing appointment by ID
  it("should return 404 for a non-existing appointment", async () => {
    const invalidId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/appointments/${invalidId}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "Appointment not found");
  });

  // Positive Test Case: Updating an existing appointment
  it("should update an existing appointment", async () => {
    const appointment = await Appointment.create({
      userName: "Jane Doe",
      contactNumber: "0987654321",
      age: 28,
      doctor: "Dr. Smith",
      date: "2024-11-10",
      time: "10:00",
      category: "Emergency",
    });

    const res = await request(app)
      .put(`/api/appointments/${appointment._id}`)
      .send({ userName: "Jane Smith" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("userName", "Jane Smith");
  });

  // Negative Test Case: Updating a non-existing appointment
  it("should return 400 when updating a non-existing appointment", async () => {
    const invalidId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/api/appointments/${invalidId}`)
      .send({ userName: "Non Existent" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Appointment not found");
  });

  // Positive Test Case: Deleting an existing appointment
  it("should delete an existing appointment", async () => {
    const appointment = await Appointment.create({
      userName: "Alice Johnson",
      contactNumber: "5678901234",
      age: 35,
      doctor: "Dr. Smith",
      date: "2024-12-15",
      time: "15:30",
      category: "Consultation",
    });

    const res = await request(app).delete(
      `/api/appointments/${appointment._id}`
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", appointment._id.toString());
  });

  // Negative Test Case: Deleting a non-existing appointment
  // it("should return 404 when deleting a non-existing appointment", async () => {
  //   const invalidId = new mongoose.Types.ObjectId();
  //   const res = await request(app).delete(`/api/appointments/${invalidId}`);

  //   expect(res.statusCode).toBe(404);
  //   expect(res.body).toHaveProperty("message", "Appointment not found");
  // });
});
