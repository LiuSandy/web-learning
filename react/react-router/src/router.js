import React from 'react'
// import { Router, Route } from './source/index'
// import { Route, Router, browserHistory } from 'react-router'
// import { HashRouter } from 'react-router-dom'
// import { createBrowserHistory } from 'history'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Home, User } from './pages'
import Other from './pages/Other';

// const BrowserRouterDom = React.cloneElement(BrowserRouter, { history: createBrowserHistory() })


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/user">User</Link>
            </li>
            <li>
              <Link to="/other">Other</Link>
            </li>
            <li>
              <Link to="/user/1/12">Info</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <div>
            <Switch>
              <Redirect from='/other' to='/user' />
              <Route exact path="/" component={Home} />
              <Route exact path="/other" component={Other} />
              <Route exact path="/user" component={User} />
              <Route exact path="/user/:id/:age" component={User} />
            </Switch>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
