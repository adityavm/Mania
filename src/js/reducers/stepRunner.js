// simple assertion
const assert = (description, check) => [description, check];

// FIXME may not be totally safe
const sandbox = (fn = "", response) => {
  let assertions = [];

  // collect all assertions
  const addAssertion = (check, description) => {
    if (!description) description = `unlabeled assertion ${assertions.length + 1}`;
    assertions.push(assert(check, description));
    return undefined;
  };

  // get modified response
  const newResponse = (function(window, document, assert, response) {
    return eval(`(function(){${fn}})(response)`);
  })({}, {}, addAssertion, JSON.parse(response));

  return {
    response: newResponse,
    assertions,
  };
};

//

const evaluateStepRunner = (state = {}, query, step) => {
  const
    givenStep = state.queries[query].steps[step],
    runner = givenStep.modifier,
    response = givenStep.response.text;

  // need response
  if (!response) return false;

  let modifiedResponse = sandbox(runner, response);

  return modifiedResponse;
};

export default evaluateStepRunner;
