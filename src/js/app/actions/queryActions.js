// constants
import {
  ADD_QUERY,
  ACTIVATE_QUERY,
  SET_QUERY_VALUE,
  EXECUTE_QUERY,
} from "js/app/constants";

const activateQuery = query => ({
  type: ACTIVATE_QUERY,
  query,
});

const addQuery = () => ({
  type: ADD_QUERY,
});

const executeQuery = dispatch => ({
  type: EXECUTE_QUERY,
  dispatch,
});

const setQueryValue = (query, key, value) => ({
  type: SET_QUERY_VALUE,
  query,
  key,
  value,
});

exports.addQuery = addQuery;
exports.activateQuery = activateQuery;
exports.setQueryValue = setQueryValue;
exports.executeQuery = executeQuery;
