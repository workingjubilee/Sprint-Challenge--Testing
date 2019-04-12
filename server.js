const express = require('express');
const helmet = require('helmet');
const knexConfig = require('./knexfile.js')
const db = require('knex')(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

// server.post('/games', async (req,res) => {

// });

server.get('/games', async (req,res) => {

  const gamesList = await db('games').select('*');
  res.status(200).json(gamesList);

});

module.exports = server;