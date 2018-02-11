
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestUtils from 'react-dom/test-utils';
import ReactTestUtils from 'react-dom/test-utils';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  let root = TestUtils.renderIntoDocument(
    <Header showInfo={false}/>
  );
  TestUtils.findRenderedDOMComponentWithClass(root, 'collapse');
});


it('can toggle collapse', () => {
  let root = TestUtils.renderIntoDocument(
    <Header showInfo={false}
            hideInfo={()=>{} }/>
  );
  let closeBtn = TestUtils.findRenderedDOMComponentWithClass(root, 'close-btn');
  ReactTestUtils.Simulate.click(closeBtn);
  root = TestUtils.renderIntoDocument(
    <Header showInfo={true}
            hideInfo={()=>{} }/>
  );
  let collapse = TestUtils.scryRenderedDOMComponentsWithClass(root, 'collapse');
  expect(collapse.length).toEqual(0);
  
});
