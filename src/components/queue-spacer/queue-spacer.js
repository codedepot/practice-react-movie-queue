import React, { Component } from 'react';
import './queue-spacer.css';

import PropTypes from 'prop-types';
import DropTarget from 'react-dnd/lib/DropTarget';

const spacerSource = {
  canDrop(props){
    return true;
  },
  drop(props, monitor, component){
    component.props.onDrop(monitor.getItem().sourceIndex, props.index);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}


class QueueSpacer extends Component {
  render() {
    const { connectDropTarget, isOver } = this.props;
    return (
      connectDropTarget(
      <div className={"queue-spacer " + (isOver?"active":"")}>
       </div>
      )     
    )
  }

}

QueueSpacer.propTypes = {
  index: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired

};
//export default QueueItem;
export default DropTarget("queue-item", spacerSource, collect)(QueueSpacer);
