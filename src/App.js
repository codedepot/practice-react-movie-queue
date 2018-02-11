import React, { Component } from 'react';
import './App.css';
import MovieList from './components/movie-list/movie-list';
import MovieQueue from './components/movie-queue/movie-queue';
import Header from './components/header/header';
import * as QueueService from './services/queue.service';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      queue : QueueService.getQueue(),
      curMovie:null,
      isInfoVisible: false,
      isControlVisible:false,
    }
  }
  headerTimeout= null;
  render() {
    return (
      <div className="App">
        <Header
          movie={this.state.curMovie}
          showInfo={this.state.isInfoVisible}
          hideInfo={()=>this.hideInfo()}>
        </Header>
        <MovieList 
          onAdd={movie =>{this.onAdd(movie)}}
          setCurMovie={movie =>{this.setCurMovie(movie)}}
          clearCurMovie={() =>{this.clearCurMovie()}}
          showInfo={movie =>{this.showInfo(movie)}}
          isControlVisible={this.state.isControlVisible}
          curMovie={this.state.curMovie}>
        </MovieList>
        <MovieQueue 
          onRemove={index =>{this.onRemove(index)}}
          onShift={(index, change) => this.onShift(index, change)} 
          onReorder={(sourceIndex, targetIndex) => this.onReorder(sourceIndex, targetIndex)}
          queue={this.state.queue}>
        </MovieQueue>
      </div>

    );
  }

  onAdd(movie){
    var newQueue = this.state.queue.slice();
    newQueue.push(movie);
    this.setState({
      queue: newQueue
    })
    QueueService.setQueue(newQueue);
  }
  onRemove(index){
    var newQueue = this.state.queue.slice();
    newQueue.splice(index,1);
    this.setState({
      queue: newQueue
    })
    QueueService.setQueue(newQueue);
  }
  onShift(index, change){
    var newQueue = this.state.queue.slice();
    var altIndex = index + change;
    if(altIndex >= 0 && altIndex < newQueue.length){
      newQueue.splice(index, 1, newQueue.splice(altIndex, 1, newQueue[index])[0]);
      this.setState({
        queue: newQueue
      });
      QueueService.setQueue(newQueue);
    }
  }
  onReorder(sourceIndex, targetIndex){
    var newQueue = this.state.queue.slice();
    //make sure within range
    if(sourceIndex >= 0 && sourceIndex <= newQueue.length 
    && targetIndex >= 0 && targetIndex <= newQueue.length){
      var sourceItem = newQueue.splice(sourceIndex, 1);
      //if sourceIndex is smaller than target, then tagetIndex needs to be shifted left
      targetIndex=sourceIndex<targetIndex?targetIndex -1: targetIndex;
      newQueue.splice(targetIndex, 0, sourceItem[0]);
      this.setState({
        queue: newQueue
      });
      QueueService.setQueue(newQueue);
    } 
  }
  //called when the user focuses on a movie either with mouse or keyboard
  setCurMovie(movie){
    clearTimeout(this.headerTimeout);
    this.setState({
      curMovie: movie,
      isControlVisible:true,
    })
  }
  
  clearCurMovie(){
    this.setState({
      isControlVisible:false
    })
    clearTimeout(this.headerTimeout);
    this.headerTimeout = setTimeout(() =>{
      this.setState({
        curMovie:null,
        isInfoVisible:false
      });
    }, 2000);
   
  }

  showInfo(movie){
     clearTimeout(this.headerTimeout);
    this.setState({
      curMovie:movie,
      isInfoVisible: true,
    })
  }
  hideInfo(){
    this.setState({
      isInfoVisible:false
    });
  }
}

export default DragDropContext(HTML5Backend)(App);