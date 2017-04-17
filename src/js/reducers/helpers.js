// creates a new or copies a given step object
const createStepObject = (step = {}) => ({
  method: step.method || "POST",
  url: step.url || "",
  payload: step.payload || "",
  response: step.respone || "",
  modifier: step.modifier || "",
});

// creates a new query object
const createQueryObject = () => ({
  steps: [createStepObject()],
  currentStep: 0,
});

// creates a new state
const createStateObject = () => ({
  queries: [createQueryObject()],
  currentQuery: 0,
});

// exports
exports.createStepObject = createStepObject;
exports.createQueryObject = createQueryObject;
exports.createStateObject = createStateObject;
