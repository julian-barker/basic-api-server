const { app } = require('../dist/src/server');
const supertest = require('supertest');
const { sequelizeDatabase } = require('../dist/src/models');
const request = supertest(app);

const clothingItems = [{
  name: 'Amazon Essentials Hoodie',
  clothing_type: 'sweatshirt',
  size: 'L',
  gender: 'men',
},
{
  name: 'Amazon Essentials Sweatpants',
  clothing_type: 'pants',
  size: 'L',
  gender: 'men',
}];

beforeAll(async () => await sequelizeDatabase.sync());

afterAll(async () => await sequelizeDatabase.drop());


describe('APIServer', () => {
  it('handles bad route', async () => {
    const response = await request.get('/bad');

    expect(response.status).toEqual(404);
  });

  it('handles bad method', async () => {
    const response = await request.patch('/clothes');

    expect(response.status).toEqual(404);
  });

  it('handles POST', async () => {
    const response = await request.post('/clothes').send(clothingItems[0])
    await request.post('/clothes').send(clothingItems[1]);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expect.objectContaining(clothingItems[0]));
  });

  it('handles GET all', async () => {
    const response = await request.get('/clothes');

    console.log('get all', response.body);

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
  });

  it('handles GET one', async () => {
    const response = await request.get('/clothes/1');

    expect(response.status).toEqual(200)
    expect(response.body).toEqual(expect.objectContaining(clothingItems[0]));
  });

  it('handles UPDATE', async () => {
    const updates = { size: 'XXS' };
    await request.put('/clothes/2').send(updates);
    const response = await request.get('/clothes/2');

    expect(response.status).toEqual(200)
    expect(response.body).toEqual(expect.objectContaining({
      ...clothingItems[1],
      ...updates
    }));
  });

  it('handles DELETE', async () => {
    const response = await request.delete('/clothes/1');

    expect(response.status).toEqual(204);
    expect(response.body).toEqual({});
  });
});