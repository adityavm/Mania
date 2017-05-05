// constants
import {
  ADD_STEP,
  REMOVE_STEP,
  ACTIVATE_STEP,
  REORDER_STEP,
  SET_CURRENT_STEP_VALUE,
  SET_STEP_VALUE,
  TOGGLE_STEP_METHOD,
  EVALUATE_STEP_RUNNER,
} from "js/app/constants";

const addStep = query => ({
  type: ADD_STEP,
  query,
});

const activateStep = (query, step) => ({
  type: ACTIVATE_STEP,
  query,
  step,
});

const removeStep = (query, step) => ({
  type: REMOVE_STEP,
  query,
  step,
});

const reorderStep = (query, from, to) => ({
  type: REORDER_STEP,
  query,
  from,
  to,
});

const setCurrentStepValue = (key, value) => ({
  type: SET_CURRENT_STEP_VALUE,
  key,
  value,
});

const setQueryStepValue = (query, step, key, value) => ({
  type: SET_STEP_VALUE,
  query,
  step,
  key,
  value,
});

const toggleStepMethod = () => ({
  type: TOGGLE_STEP_METHOD,
});

const evaluateStepRunner = (query, step) => ({
  type: EVALUATE_STEP_RUNNER,
  query,
  step,
});

exports.addStep = addStep;
exports.removeStep = removeStep;
exports.activateStep = activateStep;
exports.reorderStep = reorderStep;
exports.setCurrentStepValue = setCurrentStepValue;
exports.setQueryStepValue = setQueryStepValue;
exports.toggleStepMethod = toggleStepMethod;
exports.evaluateStepRunner = evaluateStepRunner;
