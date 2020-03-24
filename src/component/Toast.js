import React, {Component} from "react";
class Toast extends Component {
  render(){
    return(
      <div className="toast hide" id={this.props.id} role="alert"
        data-autohide={this.props.autohide}
        aria-live="assertive" aria-atomic="true" data-delay="2000">
        <div className="toast-header">
          <h6>{this.props.title}</h6>
        </div>
        <div className="toast-body">
          <h6>{this.props.children}</h6>
        </div>
      </div>
    );
  }
}
export default Toast;
