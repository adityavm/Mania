// constants
import { SET_STEP_VALUE } from "./constants";

const setCurrentStepValue = (key, value) => ({
  type: SET_STEP_VALUE,
  key,
  value,
});

export default setCurrentStepValue;
