import React from "react";
import ReactDom from "react-dom";
import store from "./store";
import Todos from "@/components/todos";
import Counter from "@/components/Counter";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { ConnectedRouter } from "connected-react-router";
import history from './history';


ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <>
        <ul>
          <li><Link to="/counter/name">counter</Link></li>
          <li><Link to={{ pathname: "/todos",state:{name:"XXX"} }}>todos</Link></li>
        </ul>

        <Switch>
          <Route path="/counter/:name" component={Counter} />
          <Route path="/todos" component={Todos} />
        </Switch>
      </>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
