import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";

import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import Menubar from "./component/Menubar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useStateValue } from "./StateProvider";
import SinglePost from "./component/SinglePost";

const App = () => {
  const [{ user }] = useStateValue();
  return (
    <>
      <BrowserRouter>
        <Container>
          <Menubar />
          <Switch>
            <Route exact path="/post/:postId" component={SinglePost} />
            <Route exact path="/" component={Home} />
            {user && <Redirect to="/" from="/login" exact />}
            {user && <Redirect to="/" from="/register" exact />}
            {!user && <Route exact path="/login" component={Login} />}
            {!user && <Route exact path="/register" component={Register} />}
          </Switch>
        </Container>
      </BrowserRouter>
    </>
  );
};

export default App;
