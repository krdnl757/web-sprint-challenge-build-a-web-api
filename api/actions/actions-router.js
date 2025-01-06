const express = require('express');
const router = express.Router();
const Action = require('./actions-model');
const md = require('./actions-middleware')
// Temporary in-memory storage for actions
let actions = [
  // Example actions for testing
  { id: 1, project_id: 1, description: 'Action 1', completed: false },
  { id: 2, project_id: 1, description: 'Action 2', completed: true },
];

// Helper function to find action by ID
const findActionById = (id) => actions.find(action => action.id === parseInt(id));

// Example projects array to simulate `project_id` validation
let projects = [
  { id: 1, name: 'Project 1' },
  { id: 2, name: 'Project 2' },
];

// [GET] /api/actions - Returns an array of actions
router.get('/', async (req, res) => {
  try{
    const action = await Action.get()
    res.status(200).json(action);
  }
    catch(error){
      next ({message:'Error getting the list of actions'
      })
    }
});

// [GET] /api/actions/:id - Returns an action by its ID
router.get('/:id',md.checkActionId, async (req, res, next) => {
  res.json(req.action)
});

// [POST] /api/actions - Adds a new action
router.post('/',md.checkActionCreatePayload, async (req, res, next) => {
  try {
    const inserted = await Action.insert(req.body)
    res.status(201).json(inserted)
  }
  catch(error) {
    next ({message:'Error creating the action'
    })
  }

  })

// [PUT] /api/actions/:id - Updates an action
router.put('/:id',md.checkActionUpdatePayload,md.checkActionId, async (req, res, next) => {
  try {
    const updated = await Action.update(req.params.id, req.body);
    res.status(200).json(updated);
  }
  catch(error) {
    next ({message: 'We ran into an error updating the project'
  })
  }
});

// [DELETE] /api/actions/:id - Deletes an action
router.delete('/:id', async (req, res) => {
  const actionId = req.params.id;
  const action = findActionById(actionId);

  if (!action) {
    return res.status(404).json({ message: 'Action not found' });
  }

 await Action.remove(req.params.id);
  res.status(204).end();
 
});

module.exports = router;
