const { app } = require('../dist/src/server');
const supertest = require('supertest');
const request = supertest(app);

describe('APIServer', () => {
  it('handles root path', async () => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBeTruthy();
  });

  it('handles bad request', async () => {
    const response = await request.get('/foo');

    expect(response.status).toBe(404);
  });

  it('handles bad method', async () => {
    const response = await request.post('/');

    expect(response.status).toBe(404);
  });

  it('handles invalid request', async () => {
    const response = await request.get('/bad');

    expect(response.status).toBe(500);
  });
});