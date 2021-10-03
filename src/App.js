import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Home';
import Restaurant from '../src/components/Restaurant'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/restaurant">
		  <Restaurant />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
