const request = require("supertest")
import express from 'express';
const app = new express();


app.use(express.static('dist'));

// Setup Server
const port = 8080;

function serverListening() {
    console.log("Server started");
    console.log("Listening http://localhost:" + port);
}

const server = app.listen(port, serverListening);


describe('Express Setup test', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/');
      expect(res.header['content-type']).toBe('text/html; charset=UTF-8');
      expect(res.statusCode).toBe(200);
    });
});

afterAll(async () => {
// gracefully shut down the server
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });
});
