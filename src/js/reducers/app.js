// base
import { combineReducers } from "redux";

// app
import { ADD_STEP,
         ADD_QUERY,
         SET_STEP_URL,
         SET_QUERY_RESPONSE,
         TOGGLE_QUERY_METHOD } from "../app/actions/constants";
import { createStepObject,
         createQueryObject,
         createStateObject } from "./helpers";

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

const setStepUrl = (oldState, url) => {
  const
    state = { ...oldState },
    query = state.queries[state.currentQuery],
    step = query.steps[query.currentStep];

  // update query steps
  query.steps = [...query.steps];
  query.steps[query.currentStep] = createStepObject({...step, url});;

  return state;
};

const setQueryResponse = (oldState, response) => {
  const
    state = { ...oldState },
    query = state.queries[state.currentQuery],
    step = query.steps[query.currentStep];

  // update query steps
  query.steps = [...query.steps];
  query.steps[query.currentStep] = createStepObject({...step, response});;

  return state;
};

const toggleQueryMethod = (oldState) => {
  const
    state = { ...oldState },
    query = state.queries[state.currentQuery],
    step = query.steps[query.currentStep];

  const newMethod = step.method === "POST" ? "GET" : "POST";

  // update query steps
  query.steps = [...query.steps];
  query.steps[query.currentStep] = createStepObject({...step, method: newMethod});;

  return state;
};

// state

const AppState = (state, action) => {
  let newState = state || createStateObject();

  if (action.type === ADD_STEP)     return addStep(newState);
  if (action.type === ADD_QUERY)    return addQuery(newState);
  if (action.type === SET_STEP_URL) return setStepUrl(newState, action.url);
  if (action.type === SET_QUERY_RESPONSE) return setQueryResponse(newState, action.response);
  if (action.type === TOGGLE_QUERY_METHOD) return toggleQueryMethod(newState);

  return newState;
};

// exports

export default AppState;
