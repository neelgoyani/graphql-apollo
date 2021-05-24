import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form } from "semantic-ui-react";
import { useStateValue } from "../StateProvider";
import { useForm } from "../util/useForm";

const Register = () => {
  const [error, setError] = useState({});
  const [{}, dispatch] = useStateValue();
  const history = useHistory();
  const { value, onSubmit, onChange } = useForm(fetchUSer, {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      dispatch({
        type: "LOGIN",
        user: result.data.createUser.userName,
      });
      localStorage.setItem("token", result.data.createUser.token);
      history.push("/");
    },
    onError(err) {
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
            type="text"
            name="email"
            placeholder="Email"
            label="Email"
            onChange={onChange}
            value={value.email}
            error={error.email ? true : false}
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
          <Form.Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            label="Confirm Password"
            onChange={onChange}
            value={value.confirmPassword}
            error={error.confirmPassword ? true : false}
          />

          <Button type="submit" primary>
            Register
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

export default Register;

const REGISTER_USER = gql`
  mutation createUser(
    $userName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    createUser(
      userInput: {
        userName: $userName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      userName
      token
    }
  }
`;
