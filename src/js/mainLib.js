import * as Constants from "js/app/constants";
import StepActions from "js/app/actions/stepActions";
import QueryActions from "js/app/actions/queryActions";
import { executeQueryStep, executeQuery } from "js/reducers/helpers";

const persistState = store => {
  let timeout = null;
  const savedState = () => document.querySelector(".saved-status");

  store.subscribe(() => {
    savedState().classList.add("saving");
    const state = store.getState();
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    };
    timeout = setTimeout(() => {
      localStorage.setItem("state", JSON.stringify(state));
      timeout = null;
      console.log("Saved @ ", new Date());
      savedState().classList.remove("saving");
    }, 2000);
  });
};

const handleKeyboard = (store, msg) => {
  const
    state = store.getState(),
    queryIdx = state.currentQuery,
    queryObj = state.queries[queryIdx],
    stepIdx = queryObj.currentStep,
    stepObj = queryObj.steps[stepIdx];

  switch (msg) {
  // steps
  case Constants.EVENT.PREVIOUS_STEP:
    if (stepIdx > 0)
      store.dispatch(StepActions.activateStep(queryIdx, stepIdx - 1));
    break;
  case Constants.EVENT.NEXT_STEP:
    if (stepIdx < queryObj.steps.length)
      store.dispatch(StepActions.activateStep(queryIdx, stepIdx + 1));
    break;
  case Constants.EVENT.EXECUTE_STEP:
    executeQueryStep(store.dispatch, queryIdx, queryObj, stepIdx, stepObj);
    break;

  // queries
  case Constants.EVENT.PREVIOUS_QUERY:
    if (queryIdx > 0)
      store.dispatch(QueryActions.activateQuery(queryIdx - 1));
    break;
  case Constants.EVENT.NEXT_QUERY:
    if (queryIdx < state.queries.length)
      store.dispatch(QueryActions.activateQuery(queryIdx + 1));
    break;
  case Constants.EVENT.EXECUTE_QUERY:
    executeQuery(store.dispatch, queryIdx, queryObj);
    break;

  // default
  default:
    break;
  }
};

exports.persistState = persistState;
exports.handleKeyboard = handleKeyboard;
