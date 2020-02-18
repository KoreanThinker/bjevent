import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'client/Root';
import 'index.css';
import * as serviceWorker from 'serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/video-react/dist/video-react.css";

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();
