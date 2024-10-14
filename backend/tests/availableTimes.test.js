const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index"); // Adjust the path according to your project structure
const AvailableTimes = require("../models/availableTimes.Model"); // Ensure the path is correct

// Test data
const doctorId = new mongoose.Types.ObjectId(); // Simulate a doctor ID for testing
const availableTimeData = {
  doctor: doctorId,
  availableTimes: [
    {
      date: "15/10/2024",
      times: ["09:00", "10:00", "11:00"],
    },
  ],
};

describe("Available Times API", () => {
  let server; // Declare server variable to manage the server instance

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    server = app.listen(0, () => {
      console.log(`Server running on port ${server.address().port}`);
    });
  });
  

  afterEach(async () => {
    await server.close();
  });  

  afterAll(async () => {
    await mongoose.disconnect();
    server.close(); // Ensure the server closes properly
  });

  // Test creating available times
  it("should create new available times", async () => {
    const res = await request(app)
      .post("/api/available-times")
      .send(availableTimeData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("doctor", doctorId.toString());
    expect(res.body.availableTimes).toHaveLength(1);
  });

  // Test fetching all available times
  it("should fetch all available times", async () => {
    await request(app).post("/api/available-times").send(availableTimeData);
    const res = await request(app).get("/api/available-times");

    expect(res.statusCode).toBe(200);
  });

  // Test fetching available times by doctor
  it("should fetch available times by doctor ID", async () => {
    await request(app).post("/api/available-times").send(availableTimeData);
    const res = await request(app).get(
      `/api/available-times/doctor/${doctorId}`
    );

    expect(res.statusCode).toBe(200);
  });

  // Test updating available times
  it("should update available times", async () => {
    const createdRes = await request(app)
      .post("/api/available-times")
      .send(availableTimeData);
    const availableTimeId = createdRes.body._id;

    const updatedData = {
      availableTimes: [
        {
          date: "16/10/2024",
          times: ["10:00", "11:00"],
          available: false,
        },
      ],
    };

    const res = await request(app)
      .put(`/api/available-times/${availableTimeId}`)
      .send(updatedData);

    expect(res.statusCode).toBe(200);
    expect(res.body.availableTimes[0]).toHaveProperty(
      "date",
      updatedData.availableTimes[0].date
    );
    expect(res.body.availableTimes[0]).toHaveProperty(
      "times",
      updatedData.availableTimes[0].times
    );
    // expect(res.body.availableTimes[0]).toHaveProperty(
    //   true,
    //   updatedData.availableTimes[0].available
    // );
  });

  // Test deleting available times
  it("should delete available times", async () => {
    const createdRes = await request(app)
      .post("/api/available-times")
      .send(availableTimeData);
    const availableTimeId = createdRes.body._id;

    const res = await request(app).delete(
      `/api/available-times/${availableTimeId}`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Available times removed");

    const fetchRes = await request(app).get(
      `/api/available-times/${availableTimeId}`
    );
    expect(fetchRes.statusCode).toBe(404); // Should not be found
  });

  // Test toggling availability
  it("should toggle availability", async () => {
    const createdRes = await request(app)
      .post("/api/available-times")
      .send(availableTimeData);
    const availableTimesId = createdRes.body._id;
    const timeId = createdRes.body.availableTimes[0]._id;

    // Check the initial state
    const initialRes = await request(app).get(
      `/api/available-times/${availableTimesId}`
    );
    expect(initialRes.statusCode).toBe(200);
    expect(initialRes.body.availableTimes[0].available).toBe(true); // Ensure initial state

    // Toggle availability
    const res = await request(app).patch(
      `/api/available-times/${availableTimesId}/toggle/${timeId}`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.available).toBe(false);

    // Toggle back to 'available'
    const resToggleBack = await request(app).patch(
      `/api/available-times/${availableTimesId}/toggle/${timeId}`
    );
    expect(resToggleBack.statusCode).toBe(200);
    expect(resToggleBack.body.available).toBe(true);
  });
});
