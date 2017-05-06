// base
import ops from "immutable-ops";
import q from "q";
import _ from "js/utils";

// app
import { executeStep, getCurrents, payloadInResponseContext } from "js/globals";
import { setQueryStepValue, evaluateStepRunner } from "js/app/actions/stepActions";

const { splice, set } = ops;

// return new state object with new val for key for current step
const replaceInCurrentStep = (oldState = {}, key = "", val = "") => {
  let
    state = { ...oldState },
    { step, query } = getCurrents(oldState, false),
    newStep = set(key, val, step);

  // update query steps
  query = { ...query, steps: splice(query.currentStep, 1, newStep, query.steps) };
  state.queries = splice(state.currentQuery, 1, { ...query }, state.queries);

  return state;
};

// return new state with new value for key in given arbitrary step and query indices
const replaceInQueryStep = (oldState = {}, query, step, key = "", val = "") => {
  let
    state = { ...oldState },
    queryObj = state.queries[query],
    stepObj = queryObj.steps[step],
    newStep = set(key, val, stepObj);

  // update query steps
  queryObj = { ...queryObj, steps: splice(step, 1, newStep, queryObj.steps) };
  state.queries = splice(query, 1, {...queryObj}, state.queries);

  return state;
};

// creates a new or copies a given step object
const createStepObject = (step = {}) => ({
  method: step.method || "POST",
  url: step.url || "",
  payload: step.payload || "",
  response: {
    status: (step.response || {}).status || 200,
    time: (step.response || {}).time || 0,
    text: (step.response || {}).text || "",
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

/* execution functions */

// set response
const dispatchAssign = (dispatch, query, step) => {
  // response object
  const constructResponseObj = (data, startTime) => {
    const timeDiff = new Date() - startTime;
    return {
      text: JSON.stringify(data.response),
      time: timeDiff,
      status: data.status,
    };
  };

  return function(data, startTime) {
    let obj = constructResponseObj(data, startTime);
    dispatch(setQueryStepValue(query, step, "response", obj));
  }
};

// needs response so that it can make next call
// before state is officially updated
const execute = (query, queryObj, step, stepObj, dispatch, response) => {
  const
    startTime = new Date(),
    setResponse = dispatchAssign(dispatch, query, step);

  dispatch(setQueryStepValue(query, step, "fetching", true));

  let promise = executeStep(queryObj, stepObj, response);
  promise
    .then(
      data => setResponse(data, startTime),
      data => setResponse(data, startTime),
    )
    .finally(data => {
      dispatch(setQueryStepValue(query, step, "fetching", false));
      dispatch(evaluateStepRunner(query, step));
    });

  return promise;
};

// execute a whole query
const executeQuery = (dispatch, queryIdx, query) => {
  // construct promise chain and run
  let request = q({});
  query.steps.forEach((step, stepIdx) => {
    request = request.then(
      promise => execute(queryIdx, query, stepIdx, step, dispatch, promise.response),
      promise => execute(queryIdx, query, stepIdx, step, dispatch, promise.response),
    );
  });
};

// execute a whole query
const executeQueryStep = (dispatch, queryIdx, queryObj, stepIdx, stepObj) => {
  let prevResponse = stepIdx === 0 ? "{}" : ((queryObj.steps[stepIdx - 1] || {}).response || {}).text || "{}";
  execute(queryIdx, queryObj, stepIdx, stepObj, dispatch, JSON.parse(prevResponse));
};

/* eo execution functions */

// exports
exports.replaceInCurrentStep = replaceInCurrentStep;
exports.replaceInQueryStep = replaceInQueryStep;
exports.createStepObject = createStepObject;
exports.createQueryObject = createQueryObject;
exports.createStateObject = createStateObject;
exports.executeQuery = executeQuery;
exports.executeQueryStep = executeQueryStep;
