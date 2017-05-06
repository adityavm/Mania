// base
import q from "q";
import ops from "immutable-ops";

// app
import {  ADD_STEP,
          REMOVE_STEP,
          ACTIVATE_STEP,
          REORDER_STEP,
          SET_STEP_VALUE,
          SET_CURRENT_STEP_VALUE,
          ADD_QUERY,
          ACTIVATE_QUERY,
          SET_QUERY_VALUE,
          TOGGLE_STEP_METHOD,
          EVALUATE_STEP_RUNNER  } from "../app/constants";
import {  replaceInCurrentStep,
          replaceInQueryStep,
          createStepObject,
          createQueryObject,
          createStateObject   } from "./helpers";

import { getCurrents } from "../globals";
import evaluateStepRunner from "./stepRunner";

const { splice, push, deepMerge, set } = ops;

// modifiers

// step modifier
const addStep = (oldState, queryIdx) => {
  let
    state = { ...oldState },
    query = state.queries[queryIdx];

  query = set("steps", [...query.steps, createStepObject()], query);
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

const reorderStep = (oldState, queryIdx, fromIdx, toIdx) => {
  let
    state = { ...oldState },
    query = state.queries[queryIdx];

  const ref = query.steps.splice(fromIdx, 1);
  query = { ...query, steps: splice(toIdx, 0, ref, query.steps) };
  state.queries = splice(queryIdx, 1, query, state.queries);

  return state;
};

const toggleStepMethod = state => {
  const { step } = getCurrents(state, false);

  const newMethod = step.method === "POST" ? "GET" : "POST";
  return replaceInCurrentStep(state, "method", newMethod);
};

// update step values
const setCurrentStepValue = (state, key, val) => replaceInCurrentStep(state, key, val);
const setQueryStepValue = (state, query, step, key, val) => replaceInQueryStep(state, query, step, key, val);

// query modifiers
const addQuery = oldState => {
  const state = { ...oldState };

  state.queries = [ ...state.queries, createQueryObject() ];
  state.currentQuery += 1;
  return state;
};

const activateQuery = (oldState, queryIdx) => {
  return { ...oldState, currentQuery: queryIdx };
};

const setQueryValue = (oldState, queryIdx, key, value) => {
  const state = { ...oldState };
  let query = state.queries[queryIdx];

  query = set(key, value, query);
  state.queries = splice(queryIdx, 1, query, state.queries);
  return state;
}

// run modifier function against response
const evaluateAgainstResponse = (state = {}, query, step) => {
  if (!query && !step) {
    query = getCurrents(state).query;
    step = getCurrents(state).step;
  }

  const evaluation = evaluateStepRunner(state, query, step);
  if (!evaluation) return state;
  else return replaceInQueryStep(state, query, step, "evaluation", evaluation);
};

// state

const AppState = (state, action) => {
  let newState = state || createStateObject();

  if (action.type === ADD_STEP)                 return addStep(newState, action.query);
  if (action.type === REMOVE_STEP)              return removeStep(newState, action.query, action.step);
  if (action.type === ACTIVATE_STEP)            return activateStep(newState, action.query, action.step);
  if (action.type === REORDER_STEP)             return reorderStep(newState, action.query, action.from, action.to);
  if (action.type === SET_CURRENT_STEP_VALUE)   return setCurrentStepValue(newState, action.key, action.value);
  if (action.type === SET_STEP_VALUE)           return setQueryStepValue(newState, action.query, action.step, action.key, action.value);
  if (action.type === ADD_QUERY)                return addQuery(newState);
  if (action.type === ACTIVATE_QUERY)           return activateQuery(newState, action.query);
  if (action.type === SET_QUERY_VALUE)          return setQueryValue(newState, action.query, action.key, action.value);
  if (action.type === TOGGLE_STEP_METHOD)       return toggleStepMethod(newState);
  if (action.type === EVALUATE_STEP_RUNNER)     return evaluateAgainstResponse(newState, action.query, action.step);

  return newState;
};

// exports

export default AppState;
