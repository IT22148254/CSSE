const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index'); // Import the Express app
const UserModel = require('../models/userModels');

// Connect to the database before running tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

// Clear the database after each test
afterEach(async () => {
  await UserModel.deleteMany({});
});

// Disconnect from the database after running tests
afterAll(async () => {
  await mongoose.disconnect();
});

// Test the /login route for Admin Login
describe('POST /login - Admin Login', () => {
  it('should login as Admin successfully', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'admin@gmail.com',
        password: 'admin',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'AdminSuccess');
    expect(res.body).toHaveProperty('email', 'admin@gmail.com');
    expect(res.body).toHaveProperty('username', 'Admin');
  });

  it('should return 404 for non-existent admin email', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'fakeadmin@gmail.com',
        password: 'admin',
      });

    expect(res.statusCode).toBe(404);
    expect(res.text).toMatch(/No record existed/);
  });
});

// Test the /register route
describe('POST /register - User Registration', () => {
  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        name: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', 'newuser');
    expect(res.body).toHaveProperty('email', 'newuser@example.com');
  });

  it('should return 500 for duplicate email registration', async () => {
    await UserModel.create({
      name: 'duplicateUser',
      email: 'duplicate@example.com',
      password: 'password123',
    });

    const res = await request(app)
      .post('/register')
      .send({
        name: 'duplicateUser2',
        email: 'duplicate@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toBe(500); // This should return 500 when a duplicate email is detected
    expect(res.body).toHaveProperty('message', 'Email already exists');
  });
});

// Test the /generate-qr route
describe('GET /generate-qr - QR Code Generation', () => {
  it('should generate a QR code for a user profile', async () => {
    await UserModel.create({
      name: 'qrUser',
      email: 'qruser@example.com',
      birthdate: '1990-01-01',
      address: '123 Main St',
      allergies: ['Peanuts'],  // Ensure the schema allows arrays for allergies
      medicalTips: 'Stay hydrated',
    });

    const res = await request(app).get('/generate-qr').query({ email: 'qruser@example.com' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('qrCode'); // The QR code data should be returned in the response
  });

  it('should return 404 if profile not found for QR code generation', async () => {
    const res = await request(app).get('/generate-qr').query({ email: 'nonexistent@example.com' });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Profile not found');
  });
});
