import React from 'react'
import { Router, Route } from './source/index'
// import { Route, Router, Switch } from 'react-router'
// import { Link } from 'react-router-dom'
// import { createBrowserHistory } from 'history'
import { Home, User } from './pages'

// const BrowserRouterDom = React.cloneElement(Router, { history: createBrowserHistory() })


function App() {
  return (
    <Router>
      <div>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/user" component={User} />
      </div>
    </Router>
  );
}

export default App;
