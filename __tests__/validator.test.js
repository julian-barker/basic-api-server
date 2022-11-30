const { app } = require('../dist/src/server');
const supertest = require('supertest');
const request = supertest(app);

describe('/person validator', () => {
  it('handles "/person" path with correct params', async () => {
    const name = 'julian';
    const response = await request.get(`/person?name=${name}`);

    expect(response.status).toEqual(200);
    expect(response.text).toEqual(`H3ll0, ${name}`);
  });

  it('handles invalid "/person" request (no name param)', async () => {
    const response = await request.get('/person');

    expect(response.status).toEqual(500)
    expect(response.body.message).toEqual('Internal Server Error: No name supplied!');
  });
});