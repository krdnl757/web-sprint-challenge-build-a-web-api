// Write your "projects" router here!
const Projects = require('./projects-model');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const projects = await Projects.get()
    res.status(200).json(projects);
})

router.get('/:id', async (req, res) => {
    const projects = await Projects.get(req.params.id)
    if (!projects) {
        return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(projects);
})

router.post('/', async (req, res) => {
    if (!req.body.name || !req.body.description) {
        return res.status(400).json({ message: 'Name and description are required' });
    }
    const project = await Projects.insert(req.body)
    res.status(201).json(project);
})

router.put('/:id', async (req, res) => {
    if (!req.body.name || !req.body.description || req.body.completed === undefined) {
        return res.status(400).json({ message: 'Name, description, and completed status are required' });
    }
    const project = await Projects.update(req.params.id, req.body)
    res.status(200).json(project);
})

router.delete('/:id', async (req, res) => {
    const project = await Projects.get(req.params.id)
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }
    await Projects.remove(req.params.id)
    res.status(204).end();
})

router.get('/:id/actions', async (req, res) => {
    const actions = await Projects.getProjectActions(req.params.id)
    res.status(200).json(actions);
})

module.exports = router;