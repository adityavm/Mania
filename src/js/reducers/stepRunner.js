// FIXME may not be totally safe
const sandbox = (fn = "", response) => {
  return (function(window, document, response) {
    return eval(fn);
  })({}, {}, JSON.parse(response));
};

const evaluateStepRunner = (oldState = {}) => {
  const
    query = oldState.queries[oldState.currentQuery],
    step = query.steps[query.currentStep];

  const
    runner = step.modifier,
    response = step.response;

  let modifiedResponse = sandbox(runner, response);

  return modifiedResponse;
};

export default evaluateStepRunner;
