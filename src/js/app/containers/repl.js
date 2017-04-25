// base
import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import _ from "../../utils";

// app
import { getCurrents } from "../../globals";
import { THEME } from "../constants";
import JSONTree from "react-json-tree";
import Editor from "../components/editor";

// styles
import "scss/containers/repl";


const toggleCURL = () => {
  const
    curl = document.querySelector("#repl .curl-container"),
    className = "active",
    method = curl.classList.contains(className) ? "remove" : "add";

  curl.classList[method](className);
};

const constructCURL = (method, url, payload) => {
  method = method.toUpperCase();
  payload = method === "GET" ? _.queryParams(payload) : payload;

  if (method === "GET") url += `?${payload}`;

  let curl = `curl -X ${method} ${url} -H 'cache-control: no-cache' -H 'content-type: application/json'`;

  if (method === "POST" && payload) {
    payload = payload.replace(/\s{2,}|\n/g, " ");
    curl += ` -d '${payload}'`;
  }

  return curl;
};

const mapStateToProps = (state = {}) => {
  const { step } = getCurrents(state, false);

  let
    response,
    modified = false,
    error;

  if (step.evaluation.response) {
    try {
      response = step.evaluation.response;
      modified = true;
    } catch (e) {
      error = e.toString();
      response = null;
    }
  } else {
    try {
      response = step.response ? JSON.parse(step.response) : null;
    } catch (e) {
      error = e.toString();
      response = null;
    }
  }

  return {
    method: step.method,
    url: step.url,
    payload: step.payload,
    error,
    response,
    fetching: step.fetching,
    assertions: step.evaluation.assertions,
    modified,
  };
};

// get current step status
const currentStatus = (response, error, modified, fetching) => {
  let
    label = null,
    classes = null;

  if (modified) label = "Response is modified";
  if (error) label = error;
  if (fetching) label = "Fetching API ...";
  if (!fetching && !response) label = "Click Play to execute";

  classes = classnames("status", { modified, error, fetching, empty: !fetching && !response });

  return label && classes && <span className={classes}>{label}</span>;
};

// render
const Repl = ({ method, url, payload, response, assertions, error, modified, fetching }) => (
  <div id="repl">
    <div className="response-meta">
      {currentStatus(response, error, modified, fetching)}

      {response && assertions.map((assert, idx) => {
        return <span key={idx} className={classnames("status", "assertion", String(assert[1]))}>
          {assert[0]}
          <span className="result">&nbsp;{assert[1] ? "succeeded" : "failed"}</span>
        </span>;
      })}
    </div>

    {!fetching && response && <JSONTree data={response} theme={THEME} />}

    {!fetching && response && !error && (
      <div className="curl-container">
        <div className="title" onClick={toggleCURL}>cURL Code</div>
        <textarea value={constructCURL(method, url, payload)} readOnly />
      </div>
    )}
  </div>
);

export default connect(
  mapStateToProps,
)(Repl);
