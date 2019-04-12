const request = require('supertest');
const server = require('./server.js');
const knexConfig = require('./knexfile.js');
const db = require('knex')(knexConfig.development);

// - [ ] Write the **tests BEFORE** writing the route handlers.

// I hate this?

// - [ ] Your API must be have `POST` and `GET` endpoints for `/games`.
// - [ ] Write a **minimum** of three tests per endpoint.

// - [ ] The `POST /games` endpoint should take in an object that looks like this

//   ```js
//   {
//     title: 'Pacman', // required
//     genre: 'Arcade', // required
//     releaseYear: 1980 // not required
//   }
//   ```

// - [ ] In the route handler, validate that the required fields are included inside the body. 
// If the information is incomplete, return a `422` status code.
// - [ ] Write tests to verify that the endpoint returns the correct HTTP status code 
// when receiving correct and incorrect game data.

// - [ ] The `GET /games` endpoint should return the list of games and HTTP status code 200.
// - [ ] Write a test to make sure this endpoint always returns an array, even if there are no games stored. 
// If there are no games to return, the endpoint should return an empty array.

// - validate that the game `title` is unique. If the client tries to create a duplicate game, return a status code 405 (Not Allowed). Write a test that checks for this.
// - add an `id` property to the game schema and write code in the server to increment it automatically. After implementing this functionality work on the following:
//   - Write a `GET /games/:id` endpoint that returns the information about a single game. Respond with a 404 status code when a game is not found for the provided `id`. Add the corresponding tests for it.
//   - add a `DELETE /games/:id` endpoint that can remove the corresponding game. If the game does not exists return a 404 status code. Write tests for this endpoint.


describe('server.js', () => {

  beforeAll(async () => {
    await db('games').truncate();
  });

  afterEach(async () => {
    await db('games').truncate();
  });

  describe('POST /games', () => {
    it('should throw a fit if handed a malformed schema', async() => {

      const badSchema = {title: "Dungeons & Dragons: Satan\'s Game"};

      const response = await request(server).post('/games').send(badSchema);

      expect(response.status).toEqual(422);
    })

    it('should return a good response if handed a correct schema', async() => {

      const goodSchema = { title: "DooM", genre: "First-Person Shooter", releaseYear: "1993" };

      const response = await request(server).post('/games').send(goodSchema);

      expect(response.status).toEqual(200);
    })

    it('should allow releaseYear to be optional', async() => {

      const optionalSchema = { title: "Wrestling", genre: "Contact Sports" };

      const response = await request(server).post('/games').send(optionalSchema);

      expect(response.type).toEqual('application/json');
    });

    it('should respond with JSON', async() => {

      const testSchema = { title: "The Dozens", genre: "Insults" };

      const response = await request(server).post('/games').send(testSchema);

      expect(response.type).toEqual('application/json');
    })
  });

  describe('GET /games', () => {
    it('should return a good response on a GET', async() => {

      const response = await request(server).get('/games');

      expect(response.status).toEqual(200);
    })

    it('should respond with JSON', async() => {

      const response = await request(server).get('/games');

      expect(response.type).toEqual('application/json');
    })

    it('should return the list of games', async() => {

      const response = await request(server).get('/games');

      expect(response.body).toEqual(expect.any(Array));
    })
  })

  describe('GET /games/:id', () => {
    it('should 404 if the game is not there', async() => {

      const response = await request(server).get('/games/999');

      console.log(response.body);

      expect(response.status).toEqual(404);
    })

    it('should return a game if if the game IS there', async() => {


      async function batchPost() {
        const validSchemas = [
          { title: "DooM", genre: "First-Person Shooter", releaseYear: "1993" },
          { title: "Wrestling", genre: "Contact Sports" },
          { title: "The Dozens", genre: "Insults" }
        ];
        const postSchemas = validSchemas.map(async (game) => {
          return await request(server).post('games').send(game);
        });

        return Promise.all(postSchemas)
      }

      const response = batchPost().then(res => request(server).get('/games/1'));

      console.log(response);

      expect(response.status).toEqual(200);
    })

  })
})