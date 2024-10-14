const request = require('supertest');
const mongoose = require("mongoose");
const app = require("../index"); // Your Express app file
const Hospital = require("../models/hospital.Model"); // Hospital Mongoose model

describe('Hospital API Tests', () => {
  let hospitalId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    server = app.listen(0, () => {
      console.log(`Server running on port ${server.address().port}`);
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    server.close();
  });

  test('should create a new hospital', async () => {
    const res = await request(app)
      .post('/api/hospitals')
      .send({
        name: 'Test Hospital',
        city: 'Test City',
        address: '123 Test St',
        pic: 'test-pic.png',
        hotline: '1234567890',
        email: 'testhospital@test.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('_id');
    hospitalId = res.body.data._id;
    console.log(`Created hospital ID: ${hospitalId}`);
  });

  test('should return all hospitals', async () => {
    const res = await request(app).get('/api/hospitals');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  test('should return a hospital by ID', async () => {
    console.log(`Testing with hospital ID: ${hospitalId}`);
    const res = await request(app).get(`/api/hospitals/${hospitalId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('_id', hospitalId);
  });

  test('should edit the hospital information', async () => {
    const res = await request(app)
      .put(`/api/hospitals/${hospitalId}`)
      .send({
        name: 'Updated Test Hospital',
        city: 'Updated City',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('name', 'Updated Test Hospital');
  });

  test('should log in as a hospital with valid credentials', async () => {
    const res = await request(app)
      .post('/api/hospitals/login')
      .send({
        email: 'testhospital@test.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toEqual('Login successful');
  });

  test('should delete the hospital by ID', async () => {
    const res = await request(app).delete(`/api/hospitals/${hospitalId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toEqual('Hospital deleted successfully');
  });

  test('should fail to log in with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/hospitals/login')
      .send({
        email: 'wrongemail@test.com',
        password: 'wrongpassword',
      });

    expect(res.statusCode).toEqual(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toEqual('Invalid email or password');
  });
});
