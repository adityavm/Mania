// base
import React from "react";

// styles
import "scss/ext/prism";
import "scss/ext/codeflask";

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let flask = new CodeFlask;
    flask.run(`#${this.props.id}`, { language: this.props.language });
    flask.onUpdate(code => this.props.onChange(code));
  }

  render() {
    return <div id={this.props.id} data-language={this.props.language}></div>
  }
}

export default Editor;
