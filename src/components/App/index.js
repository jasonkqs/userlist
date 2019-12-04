import React from "react";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "../../containers/Home";
import EditUserForm from "../../containers/Forms/EditUserForm";
import CreateUserForm from "../../containers/Forms/CreateUserForm";

import history from "../../history";

const AnotherPage = props => {
  return <Redirect to="/" />;
};

const App = props => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/editUser" exact component={EditUserForm} />
          <Route path="/createUser" exact component={CreateUserForm} />
          <Route path="/:another" component={AnotherPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
