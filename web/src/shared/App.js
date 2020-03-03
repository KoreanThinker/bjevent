import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Event1, Event2, EventList, EventClose } from 'pages';
import { fire } from './Firebase';
import class3 from '../pages/class3';

class App extends Component {
  constructor(props) {
    super(props);
    fire();
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Switch>
          <Route exact path="/event1" component={Event1} />
          <Route exact path="/event2" component={Event2} />
          <Route exact path="/eventlist" component={EventList} />
          <Route exact path="/eventClose" component={EventClose} />
          <Route exact path='/class3' component={class3} />
          {/* <Route path="/:name" component={event} /> */}
        </Switch>
      </div>
    );
  }
}
export default App;
