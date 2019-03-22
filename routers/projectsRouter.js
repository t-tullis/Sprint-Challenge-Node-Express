const express = require('express');
const router = express.Router();
const db = require('../data/helpers/projectModel.js');

//Get all projects
router.get('/', (req, res) => {
    db.get().then(project => {
        res.status(200).json({project})
    }).catch(error => {
        res.status(500).json({error : "The projects could not be retrieved"})
    })
})

//Get project by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get(id).then(project => {
        if(project === 0){
            res.status(404).json({ errorMessage: "The project with that ID does not exist" })
        }
        res.status(200).json({project})
    }).catch(error => {
        res.status(500).json({ error: "There was an error getting a project with that ID"})
    })
})

//Create A Project
router.post('/', (req,res) => {
    const { name, description } = req.body;
    if(!name || !description){
        res.status(400).json({ errorMessage: "Please provide a valid name and description for your project"})
    }
    db.insert({ name, description }).then(project => {
        res.status(201).json({project})
    }).catch(error => {
        res.status(500).json({ error: 'There was an error saving to project to the database'})
    })
})

//Update a Project
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, completed } = req.body;

    db.update(id, { name, description, completed }).then(project => {
        if(project === 0){
            res.status(404).json({ errorMessage: "The project with that ID does not exist"})
        }
        if(!name || !description){
            res.status(400).json({errorMessage: "Please provide a name, description, and completed"})
        }
        res.status(200).json({project})
    }).catch(error => {
        res.status(500).json({ error: "There was an error while saving the project to the database"})
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    db.remove(id).then(project => {
        if(project === 0){
            res.status(404).json({ errorMessage: "The project with that specified ID does not exist"})
        }
        res.status(204).end()
    }).catch(error => {
        res.status(500).json({ error: "There was an error removing that project from the database"})
    })
})

module.exports = router;