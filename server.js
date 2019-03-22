const express = require('express');

const server = express();

//Routers
const actionsRouter = require('./routers/actionsRouter.js')
const projectsRouter = require('./routers/projectsRouter.js')

//middleware
server.use(express.json());
// server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.send('Sprint-Challenge-Node-Express')
})

module.exports = server;