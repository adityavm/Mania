// base
import { combineReducers } from "redux";

// app
import {  ADD_STEP,
          ADD_QUERY,
          SET_STEP_VALUE,
          TOGGLE_STEP_METHOD   } from "../app/actions/constants";
import {  replaceInCurrentStep,
          createStepObject,
          createQueryObject,
          createStateObject   } from "./helpers";

// modifiers

const addStep = oldState => {
  const
    state = { ...oldState },
    query = state.queries[state.currentQuery];

  query.steps.push(createStepObject());
  query.currentStep += 1;
  return state;
};

const addQuery = oldState => {
  const state = { ...oldState };

  state.queries.push(createQueryObject());
  state.currentQuery += 1;
  return state;
};

const setCurrentStepValue = (state, key, val) => replaceInCurrentStep(state, key, val);

const toggleStepMethod = state => {
  const
    query = state.queries[state.currentQuery],
    step = query.steps[query.currentStep];

  const newMethod = step.method === "POST" ? "GET" : "POST";
  return replaceInCurrentStep(state, "method", newMethod);
};

// state

const AppState = (state, action) => {
  let newState = state || createStateObject();

  if (action.type === ADD_STEP)     return addStep(newState);
  if (action.type === ADD_QUERY)    return addQuery(newState);
  if (action.type === SET_STEP_VALUE) return setCurrentStepValue(newState, action.key, action.value);
  if (action.type === TOGGLE_STEP_METHOD) return toggleStepMethod(newState);

  return newState;
};

// exports

export default AppState;
