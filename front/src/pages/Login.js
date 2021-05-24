import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form } from "semantic-ui-react";
import { useStateValue } from "../StateProvider";
import { useForm } from "../util/useForm";

const Login = () => {
  const [{}, dispatch] = useStateValue();
  const [error, setError] = useState({});
  const history = useHistory();
  const { value, onSubmit, onChange } = useForm(fetchUSer, {
    userName: "",
    password: "",
  });

  const [addUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      dispatch({
        type: "LOGIN",
        user: result.data.login.userName,
      });
      localStorage.setItem("token", result.data.login.token);

      history.push("/");
    },
    onError(err) {
      console.log(err);
      setError(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: value,
  });

  function fetchUSer() {
    addUser();
  }

  return (
    <>
      <div className="register_form">
        <Form onSubmit={onSubmit}>
          <Form.Input
            type="text"
            name="userName"
            placeholder="user name"
            label="Username"
            onChange={onChange}
            value={value.userName}
            error={error.userName ? true : false}
          />

          <Form.Input
            type="password"
            name="password"
            placeholder="Password"
            label="Password"
            onChange={onChange}
            value={value.password}
            error={error.password ? true : false}
          />

          <Button type="submit" primary>
            Login
          </Button>
        </Form>
        {Object.keys(error).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(error).map((value) => {
                return <li key={value}>{value}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;

const LOGIN_USER = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      id
      email
      userName
      token
    }
  }
`;
