// constants
import { EVALUATE_STEP_RUNNER } from "../constants";
import { getCurrents } from "../../globals";

const evaluateStepRunner = (query, step) => ({
  type: EVALUATE_STEP_RUNNER,
  query,
  step,
});

export default evaluateStepRunner;
