// get currents
const getCurrents = (state = {}, count = true) => {
  const
    query = state.currentQuery,
    queryObj = state.queries[query],
    step = state.queries[state.currentQuery].currentStep,
    stepObj = state.queries[query].steps[step];

  const newObj = obj => JSON.parse(JSON.stringify(obj));

  if (!queryObj) {
    console.warn(`query missing for ${query}`, queryObj, newObj(state));
  }

  if (!stepObj) {
    console.warn(`step missing for ${step}`, stepObj, newObj(state));
  }

  return {
    query: count ? query : queryObj || {},
    step: count ? step : stepObj || {},
  };
};

const payloadInResponseContext = (payload, response) => eval(`(function(window, document, response){return ${payload};})({}, {}, response)`);

exports.getCurrents = getCurrents;
exports.payloadInResponseContext = payloadInResponseContext;
