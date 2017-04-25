// constants
import { ACTIVATE_STEP } from "../constants";

const activateStep = step => ({
  type: ACTIVATE_STEP,
  step,
});

export default activateStep;
