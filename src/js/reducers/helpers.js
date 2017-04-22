// base
import ops from "immutable-ops";

const { splice } = ops;

// return new state object with new val for key for current step
const replace = (state = {}, key = "", val = "") => {
  const
    query = state.queries[state.currentQuery],
    step = query.steps[query.currentStep],
    newStep = { ...step };

  newStep[key] = val;

  // update query steps
  query.steps = splice(query.currentStep, 1, newStep, query.steps);
  return { ...state };
};

// creates a new or copies a given step object
const createStepObject = (step = {}) => ({
  method: step.method || "POST",
  url: step.url || "",
  payload: step.payload || "",
  response: step.response || "",
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
exports.replace = replace;
exports.createStepObject = createStepObject;
exports.createQueryObject = createQueryObject;
exports.createStateObject = createStateObject;
