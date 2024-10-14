const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const Appointment = require("../models/appointmentModel");
require("dotenv").config(); // Load environment variables

describe("Appointment Controller", () => {
  let connection;

  beforeAll(async () => {
    // Connect to the test database using the MONGO_URI environment variable
    connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Clean up the appointments collection
    // await Appointment.deleteMany();

    // Disconnect from the test database
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // Clean up the appointments collection
    // await Appointment.deleteMany();
  });

  // Test case 1: Creating a new appointment (Positive Test)
  it("should create a new appointment successfully", async () => {
    const response = await request(app).post("/api/appointments/").send({
      userName: "John Doe",
      contactNumber: "0745878787",
      age: 30,
      doctor: "Dr. Smith",
      date: "2024-10-20",
      time: "14:00",
      category: "Consultation",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.userName).toBe("John Doe");
    expect(response.body.contactNumber).toBe("0745878787");
  });

  // Test case 2: Creating a new appointment with missing fields (Negative Test)
  it("should return 400 when required fields are missing", async () => {
    const response = await request(app).post("/api/appointments/").send({
      contactNumber: "0745878787",
      age: 30,
      doctor: "Dr. Smith",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  // Test case 3: Getting a non-existing appointment (Negative Test)
  it("should return 404 when the appointment does not exist", async () => {
    const invalidId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/api/appointments/${invalidId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Appointment not found");
  });

  // Test case 4: Updating an existing appointment (Positive Test)
  it("should update an existing appointment successfully", async () => {
    // First, create an appointment
    const appointment = await Appointment.create({
      userName: "Jane Doe",
      contactNumber: "0987654321",
      age: 28,
      doctor: "Dr. Smith",
      date: "2024-11-10",
      time: "10:00",
      category: "Emergency",
    });

    // Update the appointment
    const response = await request(app)
      .put(`/api/appointments/${appointment._id}`)
      .send({
        userName: "Jane Smith",
      });

    expect(response.status).toBe(200);
    expect(response.body.userName).toBe("Jane Smith");
  });

  // Test case 5: Deleting an existing appointment (Positive Test)
  it("should delete an existing appointment successfully", async () => {
    // First, create an appointment
    const appointment = await Appointment.create({
      userName: "Alice Johnson",
      contactNumber: "5678901234",
      age: 35,
      doctor: "Dr. Smith",
      date: "2024-12-15",
      time: "15:30",
      category: "Consultation",
    });

    // Delete the appointment
    const response = await request(app).delete(
      `/api/appointments/${appointment._id}`
    );

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(appointment._id.toString());
  });

  // Test case 6: Trying to update a non-existing appointment (Negative Test)
  it("should return 400 when updating a non-existing appointment", async () => {
    const invalidId = new mongoose.Types.ObjectId();
    const response = await request(app)
      .put(`/api/appointments/${invalidId}`)
      .send({
        userName: "Non Existent",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Appointment not found");
  });

  // Test case 7: Retrieve an existing appointment (Positive Test)
  it("should retrieve an existing appointment successfully", async () => {
    // First, create an appointment
    const appointment = await Appointment.create({
      userName: "Mark Taylor",
      contactNumber: "1234567890",
      age: 45,
      doctor: "Dr. Johnson",
      date: "2024-10-25",
      time: "09:00",
      category: "Checkup",
    });

    // Retrieve the appointment
    const response = await request(app).get(
      `/api/appointments/${appointment._id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.userName).toBe("Mark Taylor");
    expect(response.body.contactNumber).toBe("1234567890");
  });

  // Test case 8: Retrieve all appointments (Positive Test)
  it("should retrieve all appointments successfully", async () => {
    // Create two appointments
    await Appointment.create({
      userName: "Alice Johnson",
      contactNumber: "5678901234",
      age: 35,
      doctor: "Dr. Johnson",
      date: "2024-12-15",
      time: "15:30",
      category: "Consultation",
    });

    await Appointment.create({
      userName: "Bob Brown",
      contactNumber: "6789012345",
      age: 29,
      doctor: "Dr. Smith",
      date: "2024-12-20",
      time: "10:30",
      category: "Consultation",
    });

    // Retrieve all appointments
    const response = await request(app).get(
      "http://localhost:5000/api/appointments/"
    );

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2); // Expect two appointments to be returned
  });
});
