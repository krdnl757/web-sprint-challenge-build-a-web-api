// Write your "projects" router here!
const md = require('./projects-middleware');
const Projects = require('./projects-model');
const router = require('express').Router();

router.get('/', (req, res, next) => {
     Projects.get()
     .then(projects=>{
         res.status(200).json(projects);    
     })
     .catch(error=>{
        next({
            message:"We ran into an error retreiving projects"
        })
     })
})

router.get('/:id',md.checkProjectId, (req, res, next) => {
    // Projects.get(id)
    // .then(projects=>{
    //     res.status(200).json(projects); 
    // })

    res.json(req.project) 
})

router.post('/', async (req, res) => {
    if (!req.body.name || !req.body.description) {
        return res.status(400).json({ message: 'Name and description are required' });
    }
    const project = await Projects.insert(req.body)
    res.status(201).json(project);
})

router.put('/:id',md.checkProjectUpdatePayload,md.checkProjectId, async (req, res, next) => {
  
     await Projects.update(req.params.id, req.body) .then(updated => {
        res.status(200).json(updated);
      })
    .catch(error =>{
        next({message:'We ran into an error updating the project'

        })

    })
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