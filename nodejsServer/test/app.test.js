const app = require('../src/app');
const request = require('supertest');
const apiURIs = require('../src/apiURIs');

global.DBController = require('../src/dbController');

beforeAll(
    async () =>
    {
        await global.DBController.getInstance(':memory:'); // init test instance for testing
    });

// afterAll(
//     () =>
//     {
//         return global.DBController.close();
//     });

test("GET /",
    () =>
    {
        return request(app)
            .get("/")
            .then(
                response =>
                {
                    expect(response.statusCode).toBe(200);
                    expect(response.text).toBe("Hello, world!");
                });
    });

test('get empty',
    async function()
    {
        const response = await request(app)
            .post(apiURIs.getAllItems);
        expect(response.status).toEqual(200);
        expect(response.body.length).toBe(0);
    });

test('add',
    async () =>
    {
        return request(app)
            .post(apiURIs.addItem)
            .send(["hello world",])
            .then(
                (res) =>
                {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.id).toBe(1);
                });
    });

it('get one',
    async function()
    {
        const response = await request(app)
            .post(apiURIs.getAllItems);
        expect(response.status).toEqual(200);
        expect(response.body.length).toBe(1);
    });
