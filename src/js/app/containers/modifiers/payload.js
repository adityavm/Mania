// base
import React from "react";
import { connect } from "react-redux";

// app
import { getCurrents } from "../../../globals";
import setCurrentStepValue from "../../actions/setCurrentStepValue";
import Editor from "../../components/editor";


const mapStateToProps = (state = {}) => ({
  payload: getCurrents(state, false).step.payload,
  get error() {
    let
      error = null,
      payload = getCurrents(state, false).step.payload;
    if (!payload) return null;
    try {
      JSON.parse(payload);
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
    <div className="title" onClick={() => onClick("payload")}>Request Payload</div>
    <Editor id="payload-editor" language="javascript" onChange={setPayload} value={payload} />
    {error && <span className="status error">{error}</span>}
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Payload);
