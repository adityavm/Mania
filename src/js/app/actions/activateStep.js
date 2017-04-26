// constants
import { ACTIVATE_STEP } from "../constants";

const activateStep = (query, step) => ({
  type: ACTIVATE_STEP,
  query,
  step,
});

export default activateStep;
