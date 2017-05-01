// base
import React from "react";
import classnames from "classnames";

// app
import Icon from "js/app/components/icon";

class Curl extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    let currentState = this.state.visible;
    this.setState({ visible: !currentState });
  }

  render() {
    return (
      <div className={classnames("curl-container", { active: this.state.visible })}>
        <div className="title" onClick={this.toggle}><Icon type="code" /> cURL Code</div>
        <textarea value={this.props.value} readOnly />
      </div>
    )
  }
};

export default Curl;
