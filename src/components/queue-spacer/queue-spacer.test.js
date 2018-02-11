import React from 'react';
import ReactDOM from 'react-dom';
import QueueSpacer from './queue-spacer';
import TestUtils from 'react-dom/test-utils';

it('renders without crashing', () => {
  const OriginalQueueSpacer = QueueSpacer.DecoratedComponent;
  const identity = el => el;
  let root = TestUtils.renderIntoDocument(
    <OriginalQueueSpacer index={0}
                 connectDropTarget={identity} 
                 isOver={false}
                 canDrop={true}/>
  );
  let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
});
