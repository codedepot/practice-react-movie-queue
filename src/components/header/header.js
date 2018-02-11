import React, { Component } from 'react';
import './header.css';


class Header extends Component {
  render(){
    var infoContent;
    if(this.props.movie){
      infoContent =           
      <div className="info-wrapper" >
        <div className="row">
          <span className="info-item">
            Director: {this.props.movie.director}
          </span>
          |
          <span className="info-item">
            Genre: {this.props.movie.genre}
          </span>
          |
          <span className="info-item">
            Year: {this.props.movie.year}
          </span>
        </div>
        <div className="row mar-bottom-10">
          Staring: {this.props.movie.cast}
        </div>
        
      </div>
    }
    return(
      <header className={"header-container " + (this.props.showInfo?"":"collapse") }>
        <div className="header-status">
          <div className="title">
            {this.props.movie?this.props.movie.title:""}
          </div>
        </div>
        <div className="header-info">
          <button className="close-btn" onClick={()=>this.props.hideInfo()}>
            <i className="fa fa-times" aria-hidden="true">
              <span className="sr-only">Close Info Section</span>
            </i>
          </button>
          {infoContent}
        </div>
      </header>
    );  
  }
  
}


export default Header;

