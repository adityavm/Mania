// constants
import { ADD_STEP } from "../constants";

const addStep = query => ({
  type: ADD_STEP,
  query,
});

export default addStep;
