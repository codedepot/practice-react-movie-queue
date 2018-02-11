import React, { Component } from 'react';
import './movie-queue.css';
import QueueItem from '../queue-item/queue-item';
import QueueSpacer from '../queue-spacer/queue-spacer';


class MovieQueue extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapse:true,
      translateX:0
    }
  }

  collapse = true;
  render() {
    var moviesList = this.props.queue.map((movie, index) =>{
      var lastSpacer;
      if(index ===this.props.queue.length-1){
        lastSpacer = <QueueSpacer index={index+1} onDrop={(index, delta) => this.onDrop(index, delta)}></QueueSpacer>
      }
      return( 
      <li key={index + movie.year + movie.title}>
        <QueueSpacer index={index} onDrop={(index, delta) => this.onDrop(index, delta)}></QueueSpacer>
        <QueueItem 
          movie={movie} index={index}
          onShift={(index, delta)=>this.props.onShift(index, delta)}
          onRemove={index=>this.props.onRemove(index)}>
          </QueueItem>
          {lastSpacer}
      </li>)
    });
   
    return(      
      <div className={"movie-queue-container "  + (this.state.collapse?'collapse':'')}>
        <div className="queue-header">
          <div className="queue-status">
            {this.props.queue.length?(this.props.queue.length + " Items in Queue"):"No Items in Queue"}  
          </div>
          <button className="queue-view-btn" onClick={() =>this.toggleCollapse()}>
            <i className={"fa " + (this.state.collapse?'fa-chevron-up':'fa-chevron-down')} aria-hidden="true"><span className="sr-only">Toggle Collapse</span></i>
          </button>
        </div>

        <button className="left scroll-btn" onClick={()=>this.scrollLeft()}>
          <i className="fa fa-chevron-left" aria-hidden="true"><span className="sr-only">Scroll Left</span></i>
        </button>
        <button className="right scroll-btn" onClick={()=>this.scrollRight()}>
          <i className="fa fa-chevron-right" aria-hidden="true"><span className="sr-only">Scroll Left</span></i>
        </button>
        <div className="queue-list-wrapper">
          <ul className="queue-list" ref="queueList" style={{transform: "translateX(-" +this.state.translateX + "px)"}}>
            {moviesList}
          </ul> 
        </div>

      </div>
    )}
  toggleCollapse(){
    this.setState({
      collapse: !this.state.collapse
    })
  }
  scrollLeft(){
    var list = this.refs.queueList;
    if(list.clientWidth > this.state.translateX){
      this.setState({translateX:0});
      
    }else{
      this.setState({translateX: this.state.translateX - list.clientWidth});
    }
  }
  scrollRight(){
    var list = this.refs.queueList;
    if(list.scrollWidth <= this.state.translateX + 2*list.clientWidth){
      this.setState({translateX:list.scrollWidth - list.clientWidth});
    }else{
      this.setState({translateX: this.state.translateX + list.clientWidth});
    }
  }
  onDrop(sourceIndex, targetIndex){
    this.props.onReorder(sourceIndex, targetIndex);
  }
}



export default MovieQueue;
