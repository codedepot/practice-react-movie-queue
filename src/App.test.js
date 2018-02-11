import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TestUtils from 'react-dom/test-utils';
import getMovieList from './services/movie-list.service';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const OriginalApp = App.DecoratedComponent;
  const identity = el => el;
  let root = TestUtils.renderIntoDocument(
    <OriginalApp
                 connectDragContext={identity} />
  );
});

it('can set curMovie', () => {
  const OriginalApp = App.DecoratedComponent;
  const identity = el => el;

  let app = shallow(<OriginalApp connectDragContext={identity} ></OriginalApp>).instance();
  const movie = getMovieList()[0];
  app.setCurMovie(movie)
  expect(app.state.curMovie).toEqual(movie);
});


it('can clear curMovie', () => {
  const OriginalApp = App.DecoratedComponent;
  const identity = el => el;

  let app = shallow(<OriginalApp connectDragContext={identity} ></OriginalApp>).instance();
  const movie = getMovieList()[0];
  app.setCurMovie(movie)
  expect(app.state.curMovie).toEqual(movie);
  app.clearCurMovie();
  expect(app.state.isControlVisible).toEqual(false);
});

it('can show info and hide info', () => {
  const OriginalApp = App.DecoratedComponent;
  const identity = el => el;

  let app = shallow(<OriginalApp connectDragContext={identity} ></OriginalApp>).instance();
  const movie = getMovieList()[0];
  app.showInfo(movie)
  expect(app.state.curMovie).toEqual(movie);
  expect(app.state.isInfoVisible).toEqual(true);
  app.hideInfo();
  expect(app.state.isInfoVisible).toEqual(false);
});


it('can add movie to queue', () => {
  const OriginalApp = App.DecoratedComponent;
  const identity = el => el;

  let app = shallow(<OriginalApp connectDragContext={identity} ></OriginalApp>).instance();
  const movie = getMovieList()[0];
  app.onAdd(movie);
  expect(app.state.queue.length).toEqual(1);
});

it('can add and remove multiple movies to queue', () => {
  const OriginalApp = App.DecoratedComponent;
  const identity = el => el;

  let app = shallow(<OriginalApp connectDragContext={identity} ></OriginalApp>).instance();
  const list = getMovieList();
  app.onAdd(list[0]);
  app.onAdd(list[1]);
  expect(app.state.queue.length).toEqual(2);
  app.onRemove(1);
  expect(app.state.queue.length).toEqual(1);
  app.onAdd(list[2]);
  app.onAdd(list[3]);
  expect(app.state.queue[0]).toEqual(list[0]);
  expect(app.state.queue[1]).toEqual(list[2]);
  expect(app.state.queue[2]).toEqual(list[3]);
});

it('can shift movies', () => {
  const OriginalApp = App.DecoratedComponent;
  const identity = el => el;

  let app = shallow(<OriginalApp connectDragContext={identity} ></OriginalApp>).instance();
  const list = getMovieList();
  app.onAdd(list[0]);
  app.onAdd(list[1]);
  app.onAdd(list[2]);
  app.onAdd(list[3]);
  app.onShift(1, -1);
  expect(app.state.queue[0]).toEqual(list[1]);
  expect(app.state.queue[1]).toEqual(list[0]);
  app.onShift(2, -1);
  expect(app.state.queue[1]).toEqual(list[2]);
  expect(app.state.queue[2]).toEqual(list[0]);
  app.onShift(3, -1);
  expect(app.state.queue[2]).toEqual(list[3]);
  expect(app.state.queue[3]).toEqual(list[0]);
});


it('can reorder movies', () => {
  const OriginalApp = App.DecoratedComponent;
  const identity = el => el;

  let app = shallow(<OriginalApp connectDragContext={identity} ></OriginalApp>).instance();
  const list = getMovieList();
  app.onAdd(list[0]);
  app.onAdd(list[1]);
  app.onAdd(list[2]);
  app.onAdd(list[3]);

  app.onReorder(3, 0);
  expect(app.state.queue[0]).toEqual(list[3]);
  app.onReorder(0, 2);
  expect(app.state.queue[1]).toEqual(list[3]);
  app.onReorder(1,4);
  expect(app.state.queue[3]).toEqual(list[3]);
});