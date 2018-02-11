import React, { Component } from 'react';
import './movie-list.css';
import getMovieList from '../../services/movie-list.service';

class MovieList extends Component {
  render() {
    var curKey = this.props.curMovie? (this.props.curMovie.year + this.props.curMovie.title):"";
    var moviesList = getMovieList().map(movie =>{
      //is the movie focused?
      var key =  movie.year + movie.title;
      //var active = this.props.isControlVisible && ( movie.year + movie.title) === 
      return <li 
      className={this.props.isControlVisible && curKey === key?"active":""}
      key={key} tabIndex="0"
      onMouseEnter={()=>this.props.setCurMovie(movie)}
      onMouseLeave={()=>this.props.clearCurMovie()}
      onFocus={()=>this.props.setCurMovie(movie)}>
        <div className="poster-container">
         <img src={movie.posterURL} alt="Movie Poster"/>
         <div className="controls-container">
          <div className="controls-wrapper">
            <button className="add" onClick={() => this.props.onAdd(movie)}>
              <i className="fa fa-plus-circle" aria-hidden="true"><span className="sr-only">Add To Queue</span></i>
            </button>
            <button className="info" onClick={()=>this.props.showInfo(movie)} onBlur={()=>this.props.clearCurMovie()}>
              <i className="fa fa-info" aria-hidden="true"><span className="sr-only">View Information</span></i>
            </button>
          </div>
          
          
         </div>
        </div>        
      </li>;
    });
    return (
      
      <ul className="movie-list">{moviesList}</ul>
    );
  } 
}

export default MovieList;
