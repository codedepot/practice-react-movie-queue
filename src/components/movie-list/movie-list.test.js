import React from 'react';
import ReactDOM from 'react-dom';
import MovieList from './movie-list';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MovieList />, div);
});
