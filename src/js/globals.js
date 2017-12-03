import q from "q";
import _ from "./utils";

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

// make xhr call for given step
// pass prevResponse to not depend on redux state update
const executeStep = (query, step, prevResponse) => {
  const isGET = step.method === "GET";

  let payload, payloadInContext;

  try {
    payload = step.payload.trim() || {},
    payloadInContext = payloadInResponseContext(payload, prevResponse);  // modify payload in context of previous response
  } catch (e) {
    payloadInContext = {};
  }

  let modifiedPayload = isGET ? _.queryParams(payloadInContext) : JSON.stringify(payloadInContext); // transform

  let
    defer = q.defer(),
    url = isGET && modifiedPayload ? `${step.url}?${modifiedPayload}` : step.url;

  _.xhr(url, (isGET ? null : modifiedPayload), [["content-type", "application/json"]]).then(data => defer.resolve(data), data => defer.reject(data));

  return defer.promise;
};

exports.getCurrents = getCurrents;
exports.payloadInResponseContext = payloadInResponseContext;
exports.executeStep = executeStep;
