// base
import React from "react";

// styles
import "scss/ext/prism";
import "scss/ext/codeflask";

class Editor extends React.Component {
  constructor(props) {
    super(props);

    let flask = new CodeFlask;
    this.state = { flask };
  }

  componentDidMount() {
    var flask = this.state.flask;
    flask.run(`#${this.props.id}`, { language: this.props.language });
    flask.onUpdate(code => this.props.onChange(code));
  }

  componentWillUpdate(nextProps) {
    var flask = this.state.flask;
    flask.update(nextProps.value);
  }

  render() {
    return <div id={this.props.id} data-language={this.props.language}></div>
  }
}

export default Editor;
