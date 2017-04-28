// base
import React from "react";
import { connect } from "react-redux";

// app
import { getCurrents, payloadInResponseContext } from "../../../globals";
import setCurrentStepValue from "../../actions/setCurrentStepValue";
import Editor from "../../components/editor";
import Icon from "../../components/icon";


const mapStateToProps = (state = {}) => ({
  payload: getCurrents(state, false).step.payload,
  get error() {
    let
      error = null,
      { query, step } = getCurrents(state),
      payload = state.queries[query].steps[step].payload;

    if (!payload) return null;

    try {
      let
        prevPayload = step === 0 ? "" : state.queries[query].steps[step - 1].response.text,
        response = prevPayload === "" ? {} : JSON.parse(prevPayload);
      payloadInResponseContext(payload, response);
    } catch (e) {
      error = e.toString();
    }
    return error;
  },
});

const mapDispatchToProps = dispatch => ({
  setPayload: value => dispatch(setCurrentStepValue("payload", value)),
});

const Payload = ({ payload, error, setPayload, onClick }) => (
  <div id="payload" className="expanded">
    <div className="title" onClick={() => onClick("payload")}>
      Request Payload
      <Icon type="menu" />
      <Icon type="menu-down" />
    </div>
    <Editor id="payload-editor" language="javascript" onChange={setPayload} value={payload} />
    {error && <span className="status error">{error}</span>}
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Payload);
