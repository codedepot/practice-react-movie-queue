
This is a netflix style movie queue made from the starter kit from react: (https://github.com/facebookincubator/create-react-app) 
This was a solution to a programming challenge focused on React

Live Demo: https://moviequeue-45d73.firebaseapp.com/ 


The solution is built with react; features an info header and queue menu which open/collapse. 
All the animations are done with CSS3 and are toggled by changing component states.
All the app logic and state is handled in App.js and the values are passed to the children.
The app backs up the queue through local storage (which is handled by a service).
The queue menu implements react drag and drop, the user can reorder the queue by draggin the movies and placing them in the space between (space will highlight).
The queue menu also implements a carousel design which allows the user to paginate through the queue when there are many items.
The application uses Jest with Enzyme for testing and handles the majority of the functionality in App.test.js
The style was built with SCSS (compiled with koala) using font awesome and considering different screen resizes.

