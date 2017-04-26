// base
import ops from "immutable-ops";
import q from "q";
import _ from "../utils";

// app
import { getCurrents } from "../globals";

const { splice, set } = ops;

// return new state object with new val for key for current step
const replaceInCurrentStep = (state = {}, key = "", val = "") => {
  const
    { step, query } = getCurrents(state, false),
    newStep = set(key, val, step);

  // update query steps
  query.steps = splice(query.currentStep, 1, newStep, query.steps);
  state.queries = splice(state.currentQuery, 1, {...query}, state.queries);

  return { ...state };
};

// creates a new or copies a given step object
const createStepObject = (step = {}) => ({
  method: step.method || "POST",
  url: step.url || "",
  payload: step.payload || "",
  response: {
    status: step.response.status || null,
    time: step.response.time || 0,
    text: step.response.text || "",
  },
  evaluation: {
    assertions: (step.evaluation || {}).assertions || [],
    response: (step.evaluation || {}).response || "",
  },
  modifier: step.modifier || "",
  fetching: step.fetching || false,
});

// creates a new query object
const createQueryObject = () => ({
  title: "Anonymous Query",
  steps: [createStepObject()],
  currentStep: 0,
});

// creates a new state
const createStateObject = () => ({
  queries: [createQueryObject()],
  currentQuery: 0,
});

// make xhr call for given step
const executeStep = (state = {}, query, step) => {
  const
    givenStep = state.queries[query].steps[step],
    isGET = givenStep.method === "GET",
    defer = q.defer();

  let
    payload = isGET ? _.queryParams(givenStep.payload) : givenStep.payload,
    url = isGET ? `${givenStep.url}?${payload}` : givenStep.url;

  _.xhr(url, (isGET ? null : payload), [["content-type", "application/json"]]).then(data => defer.resolve(data), data => defer.reject(data));

  return defer.promise;
};

// exports
exports.replaceInCurrentStep = replaceInCurrentStep;
exports.createStepObject = createStepObject;
exports.createQueryObject = createQueryObject;
exports.createStateObject = createStateObject;
exports.executeStep = executeStep;
