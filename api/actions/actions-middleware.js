// add middlewares here related to actions
const Action = require('./actions-model');
async function checkActionId(req, res, next) {
  try {
    const action = await Action.get(req.params.id);
    if (action) {
      req.action = action
      next();
    } else {
      next({ status: 404, message: 'We could not find the action' });
    }
  } catch (error) {
    next({ message: 'Error getting the action' });
  }
}

async function checkActionCreatePayload(req, res, next) {
  if (
    req.body.description && req.body.project_id && req.body.notes
  ) {
    next()
  } else {
    next({
      status: 400,
      message: 'Please provide description, notes and the id of the project',
    });
  }
}

async function checkActionUpdatePayload(req, res, next) {
  if (
    req.body.description &&
    req.body.notes &&
    req.body.project_id &&
    req.body.completed !== undefined
  ) {
    next()
  } else {
    next({
      status: 400,
      message: 'Please provide description, notes, completed and the id of the project',
    });
  }
}
module.exports = {
    checkActionId,
    checkActionCreatePayload,
    checkActionUpdatePayload,
  }