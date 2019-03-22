const express = require('express');

const server = express();

//middleware
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Sprint-Challenge-Node-Express')
})

module.exports = server;