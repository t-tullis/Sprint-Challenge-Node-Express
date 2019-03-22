const express = require('express');
const router = express.Router();
const db = require('../data/helpers/actionModel.js');

//Get all projects
router.get('/', (req, res) => {
    db.get().then(actions => {
        res.status(200).json({actions})
    }).catch(error => {
        res.status(500).json({error : "The actions could not be retrieved"})
    })
})

//Get all actions by ID
router.get('/:id', (req, res) => {
    const { id } = req.params
    db.get(id).then(actions => {
        if(actions === 0){
            res.status(404).json({ errorMessage: "There are no actions for this project"})
        }
        res.status(200).json({actions})
    }).catch(error => {
        res.status(500).json({ error: "There was an error retrieving the actions"})
    })
})

//Add actions
router.post('/', (req, res) => {
    const {project_id, description, notes} = req.body
    if(!project_id || !description || !notes){
        res.status(400).json({ errorMessage: "Please provide a valid project ID, description, and notes"})
    }
    db.insert({project_id, description, notes}).then(actions => {
        res.status(201).json({actions})
    }).catch( error => {
        res.status(500).json({ error: "There was an error saving actions to the database"})
    })
})

//Updating an action
router.put('/:id', (req, res) => {
    const { id } = req.params
    const { project_id, description, notes, completed } = req.body;

    db.update(id, {project_id, description, notes, completed}).then(actions => {
        if(actions === 0){
            res.status(404).json({ errorMessage: "No actions exist for this specified ID"})
        }
        if(!project_id || !description || !notes){
            res.status(400).json({ errorMessage: "Please provide a valid project ID, description, and notes"})
        }
        res.status(200).json({actions})
    }).catch( error => {
        res.status(500).json({ error: "There was an error updating this project's actions"})
    })
})

//Remove actions
router.delete('/:id', (req,res) => {
    const { id } = req.params;
    db.remove(id).then(actions => {
        if(actions === 0){
            res.status(404).json({errorMessage: "The actions you are trying to delete does not exist"})
        }
        res.status(204).end()
    }).catch( error => {
        res.status(500).json({ error: "There was and error removing the actions from the database"})
    })
})

module.exports = router;