// simple assertion
const assert = (description, check) => [description, check];

// FIXME may not be totally safe
const sandbox = (fn = "", response) => {
  let assertions = [];

  const addAssertion = (description, check) => {
    assertions.push(assert(description, check));
    return undefined;
  };

  const newResponse = (function(window, document, assert, response) {
    return eval(fn);
  })({}, {}, addAssertion, JSON.parse(response));

  return {
    response: newResponse,
    assertions,
  };
};

const evaluateStepRunner = (oldState = {}) => {
  const
    query = oldState.queries[oldState.currentQuery],
    step = query.steps[query.currentStep];

  const
    runner = step.modifier,
    response = step.response;

  // need response
  if (!response) return false;

  let modifiedResponse = sandbox(runner, response);

  return modifiedResponse;
};

export default evaluateStepRunner;
