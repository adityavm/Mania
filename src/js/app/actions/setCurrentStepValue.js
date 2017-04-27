// constants
import { SET_CURRENT_STEP_VALUE } from "../constants";

const setCurrentStepValue = (key, value) => ({
  type: SET_CURRENT_STEP_VALUE,
  key,
  value,
});

export default setCurrentStepValue;
