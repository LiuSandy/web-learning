import React from 'react'
import { Route, Router, Switch } from 'react-router'
import { BrowserRouter, Link } from 'react-router-dom'
// import { createBrowserHistory } from 'history'
import { Home, User } from './pages'

// const BrowserRouterDom = React.cloneElement(Router, { history: createBrowserHistory() })


function App() {
  return (
    <div>
      <BrowserRouter>
        <Link to="/" >Home</Link>
        &nbsp;&nbsp;&nbsp;
        <Link to="/user" >User</Link>

        <Switch>
          <Route exact path="/" component={Home}>
            <User />
          </Route>
          <Route exact path="/user" component={User} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
