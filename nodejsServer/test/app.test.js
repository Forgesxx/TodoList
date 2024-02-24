const app = require('../src/app');
const request = require('supertest');

describe("Simple GET test",
    () =>
    {
        test("It should response the GET method",
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
    });

// describe('GET /',
//     () =>
//     {
//         test('should get 200',
//             done =>
//             {
//                 request(app).get('/').expect(200, done);
//             });

//         test('should get Hello World',
//             done =>
//             {
//                 request(app).get('/').expect('Hello, world!', done);
//             });
//     });
