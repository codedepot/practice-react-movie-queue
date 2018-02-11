import React, { Component } from 'react';
import './queue-item.css';

import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

const itemSource = {
  beginDrag(props) {
    return {
      sourceIndex:props.index
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class QueueItem extends Component {

  render() {
    const { connectDragSource } = this.props;
    return (
      connectDragSource(
      <div className="item-container">
        <img src={this.props.movie.posterURL} alt="Movie Poster"/>
        <div className="controls-container">
         <div className="controls-wrapper">
           <button className="move-left" onClick={()=>this.props.onShift(this.props.index, -1)}>
             <i className="fa fa-chevron-left" aria-hidden="true"><span className="sr-only">View Information</span></i>
           </button>
           <button className="remove" onClick={()=>this.props.onRemove(this.props.index)}>
             <i className="fa fa-minus-circle" aria-hidden="true"><span className="sr-only">Add To Queue</span></i>
           </button>
           <button className="move-right" onClick={()=>this.props.onShift(this.props.index, 1)}>
             <i className="fa fa-chevron-right" aria-hidden="true"><span className="sr-only">View Information</span></i>
           </button>
         </div>
         
         
        </div>
       </div>
      )     
    )
  }

}

QueueItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource("queue-item", itemSource, collect)(QueueItem);
