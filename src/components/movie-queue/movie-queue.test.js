import React from 'react';
import ReactDOM from 'react-dom';
import MovieQueue from './movie-queue';
import ReactTestUtils from 'react-dom/test-utils';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';
import getMovieList from '../../services/movie-list.service';

it('renders without crashing', () => {

  const div = document.createElement('div');
  ReactDOM.render(<MovieQueue queue={[]} />, div);
});


it('renderes in collapse and can toggle', () => {

  let root = TestUtils.renderIntoDocument(
    <MovieQueue queue={[]}/>
  );
  TestUtils.findRenderedDOMComponentWithClass(root, 'collapse');
  let viewBtn = TestUtils.findRenderedDOMComponentWithClass(root, 'queue-view-btn');
  ReactTestUtils.Simulate.click(viewBtn);
  let collapsed = TestUtils.scryRenderedDOMComponentsWithClass(root, 'collapse');
  expect(collapsed.length).toEqual(0);
});
