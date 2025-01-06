const Project = require('./projects-model')
async function checkProjectId(req, res, next) {
  try {
    const project = await Project.get(req.params.id);
    if (project) {
      req.project = project
      next();
    } else {
      next({ status: 404, message: 'We could not find the project' });
    }
  } catch (error) {
    next({ message: 'Error getting the project' });
  }
}
async function checkProjectCreatePayload(req, res, next) {
  if (req.body.name && req.body.description) {
    next()
  } else {
    next({
      status: 400,
      message: 'Please provide name and description for the project',
    });
  }
}

async function checkProjectUpdatePayload(req, res, next) {
  if (req.body.name && req.body.description && req.body.completed !== undefined) {
    next()
  } else {
    next({
      status: 400,
      message: 'Please provide name, description and completed status',
    });
  }
}
module.exports = {checkProjectId, checkProjectUpdatePayload, checkProjectCreatePayload} 