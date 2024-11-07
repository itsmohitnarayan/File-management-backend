const request = require('supertest');
const app = require('../app'); // Assuming app.js exports your Express instance
const mongoose = require('mongoose');

describe('File Routes', () => {
  beforeAll(async () => {
    // Connect to a test database before running tests
    await mongoose.connect(process.env.MONGODB_URI_TEST, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Disconnect after tests
    await mongoose.connection.close();
  });

  it('should create a new file request', async () => {
    const res = await request(app)
      .post('/api/files/request')
      .send({ name: 'Student Records', currentDepartment: 'Administration' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('file');
    expect(res.body.file).toHaveProperty('name', 'Student Records');
  });

  it('should approve a file request', async () => {
    const fileRes = await request(app)
      .post('/api/files/request')
      .send({ name: 'Financial Report', currentDepartment: 'Finance' });
    
    const fileId = fileRes.body.file._id;
    const res = await request(app).put(`/api/files/approve/${fileId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.file.status).toEqual('approved');
  });
});
