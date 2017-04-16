const createStepObject = () => ({
  query: "",
  payload: "",
  response: "",
  modifier: "",
});

const createQueryObject = () => ({
  steps: [createStepObject()],
  currentStep: 0,
});

const createStateObject = () => ({
  queries: [createQueryObject()],
  currentQuery: 0,
});

exports.createStepObject = createStepObject;
exports.createQueryObject = createQueryObject;
exports.createStateObject = createStateObject;
