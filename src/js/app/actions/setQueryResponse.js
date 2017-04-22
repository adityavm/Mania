// constants
import { SET_QUERY_RESPONSE } from "./constants";

export default (data) => ({
  type: SET_QUERY_RESPONSE,
  response: JSON.stringify(data),
});
