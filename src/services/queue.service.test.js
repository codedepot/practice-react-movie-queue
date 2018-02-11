import React from 'react';
import ReactDOM from 'react-dom';
import {getQueue, addToQueue, removeFromQueue, setQueue} from './queue.service';
import getMovieList from './movie-list.service';

it('can add and get items to local storage queue', () => {
  //console.log(getQueue);
  expect(getQueue()).toEqual([]);
  var movie = getMovieList()[0];
  addToQueue(movie);
  expect(getQueue()[0]).toEqual(movie);
});

it('can clear items from local storage queue', () => {
  var list = getMovieList();
  addToQueue(list[0]);
  expect(getQueue().length === 0).toEqual(false);
  setQueue([]);
  expect(getQueue().length === 0).toEqual(true);
});
it('can add and remove items to local storage queue', () => {
  expect(getQueue()).toEqual([]);
  var list = getMovieList();
  addToQueue(list[0]);
  addToQueue(list[1]);
  addToQueue(list[2]);
  expect(getQueue().length).toEqual(3);

  removeFromQueue(2);
  expect(getQueue().length).toEqual(2);
  removeFromQueue(0);
  expect(getQueue().length).toEqual(1);
  expect(getQueue()[0]).toEqual(list[1]);
});
