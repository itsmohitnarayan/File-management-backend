import request from 'supertest';
import app from './server'; // Ensure this path is correct

let token;

beforeAll(async () => {
  try {
    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({
        email: 'johndoe@example.com',
        password: 'securepassword',
      });

    if (loginResponse.status !== 200) {
      throw new Error('Failed to login');
    }

    token = loginResponse.body.token; // Store the token for use in other tests
  } catch (error) {
    console.error('Error during login:', error);
  }
});

// Test for file upload
describe('File Upload', () => {
  it('should upload a file successfully', async () => {
    const res = await request(app)
      .post('/api/files')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', 'path/to/your/file.pdf') // Ensure this path is correct
      .field('department', 'HR')
      .field('status', 'on the way');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('File uploaded successfully');
    expect(res.body.file).toHaveProperty('_id');
  });
});

// Test for tracking a file
describe('File Tracking', () => {
  let fileId;

  beforeAll(async () => {
    const fileRes = await request(app)
      .post('/api/files')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', 'path/to/your/file.pdf')
      .field('department', 'HR')
      .field('status', 'on the way');

    fileId = fileRes.body.file._id; // Store the file ID for the next test
  });

  it('should track a file successfully', async () => {
    const res = await request(app)
      .get(`/api/files/${fileId}/track`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`Tracking file with ID: ${fileId}`);
    expect(res.body.file).toHaveProperty('_id', fileId);
  });
});

// Test for requesting file movement
describe('Request File Movement', () => {
  let fileId;

  beforeAll(async () => {
    const fileRes = await request(app)
      .post('/api/files')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', 'path/to/your/file.pdf')
      .field('department', 'HR')
      .field('status', 'on the way');

    fileId = fileRes.body.file._id;
  });

  it('should request a file for movement successfully', async () => {
    const res = await request(app)
      .post(`/api/files/${fileId}/request`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`File with ID: ${fileId} requested for movement`);
  });
});

// Test for moving a file
describe('Move File', () => {
  let fileId;

  beforeAll(async () => {
    const fileRes = await request(app)
      .post('/api/files')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', 'path/to/your/file.pdf')
      .field('department', 'HR')
      .field('status', 'on the way');

    fileId = fileRes.body.file._id;
  });

  it('should move a file successfully', async () => {
    const res = await request(app)
      .put(`/api/files/${fileId}/move`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        newDepartment: 'Finance',
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`File with ID: ${fileId} moved successfully`);
  });
});

// Test for file deletion
describe('Delete File', () => {
  let fileId;

  beforeAll(async () => {
    const fileRes = await request(app)
      .post('/api/files')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', 'path/to/your/file.pdf')
      .field('department', 'HR')
      .field('status', 'on the way');

    fileId = fileRes.body.file._id;
  });

  it('should delete a file successfully', async () => {
    const res = await request(app)
      .delete(`/api/files/${fileId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('File deleted successfully');
  });
});
