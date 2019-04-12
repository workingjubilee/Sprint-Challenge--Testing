const express = require('express');
const helmet = require('helmet');
const knexConfig = require('./knexfile.js')
const db = require('knex')(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

module.exports = server;