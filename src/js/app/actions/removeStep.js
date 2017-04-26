// constants
import { REMOVE_STEP } from "../constants";

const removeStep = (query, step) => ({
  type: REMOVE_STEP,
  query,
  step,
});

export default removeStep;
