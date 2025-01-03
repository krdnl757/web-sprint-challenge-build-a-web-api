const express = require('express');
const router = express.Router();

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
router.get('/', (req, res) => {
  res.json(actions);
});

// [GET] /api/actions/:id - Returns an action by its ID
router.get('/:id', (req, res) => {
  const action = findActionById(req.params.id);
  if (action) {
    res.json(action);
  } else {
    res.status(404).json({ message: 'Action not found' });
  }
});

// [POST] /api/actions - Adds a new action
router.post('/', (req, res) => {
  const { project_id, description, completed } = req.body;

  // Validate request body
  if (!project_id || !description || completed === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Validate if project_id exists
  const projectExists = projects.some(project => project.id === project_id);
  if (!projectExists) {
    return res.status(400).json({ message: 'Invalid project_id' });
  }

  // Create new action
  const newAction = {
    id: actions.length + 1,
    project_id,
    description,
    completed
  };
  actions.push(newAction);
  res.status(201).json(newAction);
});

// [PUT] /api/actions/:id - Updates an action
router.put('/:id', (req, res) => {
  const actionId = req.params.id;
  const action = findActionById(actionId);

  if (!action) {
    return res.status(404).json({ message: 'Action not found' });
  }

  const { project_id, description, completed } = req.body;

  // Validate request body
  if (!project_id || !description || completed === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Validate if project_id exists
  const projectExists = projects.some(project => project.id === project_id);
  if (!projectExists) {
    return res.status(400).json({ message: 'Invalid project_id' });
  }

  // Update the action
  action.project_id = project_id;
  action.description = description;
  action.completed = completed;

  res.json(action);
});

// [DELETE] /api/actions/:id - Deletes an action
router.delete('/:id', (req, res) => {
  const actionId = req.params.id;
  const action = findActionById(actionId);

  if (!action) {
    return res.status(404).json({ message: 'Action not found' });
  }

  // Remove action from the array
  actions = actions.filter(a => a.id !== parseInt(actionId));

  res.status(204).end(); // No content, successfully deleted
});

module.exports = router;
