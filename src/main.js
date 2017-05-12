import React from 'react';
import { render } from 'react-dom';
import MyApp from './MyApp';

// This is seperated to another file so that way we don't have
// to render the app when we compile and load the index file
// for the test cases. This is only needed when running the real app.
render(<MyApp />, document.getElementById('app'));
