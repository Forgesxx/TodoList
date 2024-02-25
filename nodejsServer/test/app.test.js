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

test('add one',
    () =>
    {
        return request(app)
            .post(apiURIs.addItem)
            .send(["hello world",])
            .then(
                (res) =>
                {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.length).toBe(1);
                    const item = res.body[0];
                    expect(item.id).toBe(1);
                    expect(item.item).toBe("hello world");
                });
    });

it('get one',
    async function()
    {
        const response = await request(app)
            .post(apiURIs.getAllItems);
        expect(response.status).toEqual(200);
        expect(response.body.length).toBe(1);
        const item = response.body[0];
        expect(item.id).toBe(1);
        expect(item.item).toBe("hello world");
    });

test('add multiple',
    () =>
    {
        return request(app)
            .post(apiURIs.addItem)
            .send(["item1", "item2", "item3"])
            .then(
                (res) =>
                {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.length).toBe(3);
                    const items = res.body;
                    expect(items[0].id).toBe(2);
                    expect(items[0].item).toBe("item1");

                    expect(items[1].id).toBe(3);
                    expect(items[1].item).toBe("item2");

                    expect(items[2].id).toBe(4);
                    expect(items[2].item).toBe("item3");
                });
    });

test('add empty',
    () =>
    {
        return request(app)
            .post(apiURIs.addItem)
            .send([])
            .then(
                (res) =>
                {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.length).toBe(0);
                });
    });
