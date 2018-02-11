import React from 'react';
import ReactDOM from 'react-dom';
import QueueItem from './queue-item';
import TestUtils from 'react-dom/test-utils';

it('renders without crashing', () => {

  const OriginalQueueItem = QueueItem.DecoratedComponent;
  const identity = el => el;

  // Render with one set of props and test
  let root = TestUtils.renderIntoDocument(
    <OriginalQueueItem
      connectDragSource={identity} 
      isDragging={true}
      movie={{}}
      index={0}
      />
  );
  let div = TestUtils.scryRenderedDOMComponentsWithTag(root, 'div');
});
