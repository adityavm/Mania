// constants
import { SET_STEP_VALUE } from "../constants";

const setStepValue = (query, step, key, value) => ({
  type: SET_STEP_VALUE,
  query,
  step,
  key,
  value,
});

export default setStepValue;
