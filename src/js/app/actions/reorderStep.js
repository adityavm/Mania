// constants
import { REORDER_STEP } from "../constants";

const reorderStep = (query, from, to) => ({
  type: REORDER_STEP,
  query,
  from,
  to,
});

export default reorderStep;
