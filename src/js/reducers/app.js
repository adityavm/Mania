// base
import { combineReducers } from "redux";
import q from "q";
import ops from "immutable-ops";

// app
import {  ADD_STEP,
          REMOVE_STEP,
          ACTIVATE_STEP,
          ADD_QUERY,
          SET_STEP_VALUE,
          TOGGLE_STEP_METHOD,
          EVALUATE_STEP_RUNNER,
          EXECUTE_QUERY   } from "../app/constants";
import {  replaceInCurrentStep,
          createStepObject,
          createQueryObject,
          createStateObject,
          executeStep   } from "./helpers";

import { getCurrents } from "../globals";
import actionSetCurrentStepValue from "../app/actions/setCurrentStepValue";
import actionEvaluateStepRunner from "../app/actions/evaluateStepRunner";
import evaluateStepRunner from "./stepRunner";

const { splice, push, deepMerge, set } = ops;

// modifiers

const addStep = (oldState, queryIdx) => {
  let
    state = { ...oldState },
    query = state.queries[queryIdx];

  query.steps.push(createStepObject());
  query = set("currentStep", query.steps.length - 1, query);
  state.queries = splice(queryIdx, 1, query, state.queries);

  return state;
};

const removeStep = (oldState, queryIdx, step) => {
  let
    state = { ...oldState },
    query = state.queries[queryIdx];

  if (query.steps.length === 1) {
    console.warn("last step, aborting");
    return oldState;
  }

  let newStep = query.currentStep >= step ? query.currentStep - 1 : query.currentStep;
  query = {...set("currentStep", newStep, query)};
  query.steps = splice(step, 1, [], query.steps);
  state.queries = splice(queryIdx, 1, query, state.queries);

  return state;
};

const activateStep = (oldState, queryIdx, step) => {
  const
    state = { ...oldState },
    query = state.queries[queryIdx];

  query.currentStep = step;
  return state;
}

const addQuery = oldState => {
  const state = { ...oldState };

  state.queries.push(createQueryObject());
  state.currentQuery += 1;
  return state;
};

const setCurrentStepValue = (state, key, val) => replaceInCurrentStep(state, key, val);

const toggleStepMethod = state => {
  const { step } = getCurrents(state, false);

  const newMethod = step.method === "POST" ? "GET" : "POST";
  return replaceInCurrentStep(state, "method", newMethod);
};

const updateResponse = (state = {}) => {
  const { query, step } = getCurrents(state);

  const evaluation = evaluateStepRunner(state, query, step);
  if (!evaluation) return state;
  else return replaceInCurrentStep(state, "evaluation", evaluation);
};

const executeQuery = (state = {}, dispatch) => {
  const { query, step } = getCurrents(state);
  const startTime = new Date();

  const constructResponseObj = (data, startTime) => {
    const timeDiff = new Date() - startTime;
    return {
      text: JSON.stringify(data.response),
      time: timeDiff,
      status: data.status,
    };
  };

  executeStep(state, query, step)
  .then(
    data => {
      dispatch(actionSetCurrentStepValue("response", constructResponseObj(data, startTime)));
    },
    data => {
      dispatch(actionSetCurrentStepValue("response", constructResponseObj(data, startTime)));
    }
  ).finally(() => {
    dispatch(actionSetCurrentStepValue("fetching", false));
    dispatch(actionEvaluateStepRunner());
  });
};

// state

const AppState = (state, action) => {
  let newState = state || createStateObject();

  if (action.type === ADD_STEP)                 return addStep(newState, action.query);
  if (action.type === REMOVE_STEP)              return removeStep(newState, action.query, action.step);
  if (action.type === ACTIVATE_STEP)            return activateStep(newState, action.query, action.step);
  if (action.type === ADD_QUERY)                return addQuery(newState);
  if (action.type === SET_STEP_VALUE)           return setCurrentStepValue(newState, action.key, action.value);
  if (action.type === TOGGLE_STEP_METHOD)       return toggleStepMethod(newState);
  if (action.type === EVALUATE_STEP_RUNNER)     return updateResponse(newState);
  if (action.type === EXECUTE_QUERY)            executeQuery(newState, action.dispatch);

  return newState;
};

// exports

export default AppState;
