// constants
import { SET_STEP_VALUE } from "./constants";

const setStepValue = (key, value) => ({
  type: SET_STEP_VALUE,
  key,
  value,
});

export default setStepValue;
