const server = require('./server.js');

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


describe('server.js', () => {

  describe('POST /games', () => {
    it('should throw a fit if handed a malformed schema', async() => {

      const badSchema = {title: "Dungeons & Dragons: Satan\'s Game"};

      const response = await request(server).post('/games').send(badSchema);

      expect(response.status).toEqual(422);
    })

    it('should return a good response if handed a correct schema', async() => {

      const goodSchema = {title: "DooM", genre: "First-Person Shooter", releaseYear: "1993" };

      const response = await request(server).post('/games').send(goodSchema);

      expect(response.status).toEqual(200);
    })

    it('should allow releaseYear to be optional', async() => {

      const optionalSchema = {title: "Wrestling", genre: "Contact Sports" };

      const response = await request(server).post('/games').send(optionalSchema);

      expect(response.type).toEqual('application/json');
    });

    it('should respond with JSON', async() => {

      const optionalSchema = {title: "The Dozens", genre: "Insults" };

      const response = await request(server).post('/games').send(optionalSchema);

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
})