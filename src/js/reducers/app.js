// base
import { combineReducers } from "redux";

// containers
import { ADD_STEP, ADD_QUERY } from "../app/actions/constants";
import { createStepObject,
         createQueryObject,
         createStateObject } from "./helpers";

// modifiers

const addStep = state => {
  let newState = {
    queries: [...state.queries],
    currentQuery: state.currentQuery,
  };
  let query = newState.queries[newState.currentQuery];
  query.steps.push(createStepObject());
  query.currentStep += 1;
  return newState;
};

const addQuery = state => {
  let newState = {
    queries: [
      ...state.queries,
      createQueryObject(),
    ],
    currentQuery: state.currentQuery + 1,
  };
  newState.queries.push(createQueryObject());
  return newState;
};

// state

const AppState = (state, action) => {
  let newState = state || createStateObject();

  if (action.type === ADD_STEP) return addStep(newState);
  if (action.type === ADD_QUERY) return addQuery(newState);

  return newState;
};

// exports

export default AppState;
