import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import { FETCH_POSTS } from "../util/graphql";
import { useForm } from "../util/useForm";

const PostForm = () => {
  const { value, onChange, onSubmit } = useForm(createPosts, {
    body: "",
  });

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    variables: value,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS,
      });
      const posts = [result.data.createPost, ...data.getpost];
      //   console.log(...data.getpost);
      //   console.log(result.data.createPost);
      proxy.writeQuery({
        query: FETCH_POSTS,
        data: { ...data, getpost: posts },
      });
      value.body = "";
    },
  });

  function createPosts() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create Post:</h2>
        <Form.Field>
          <Form.Input
            type="text"
            name="body"
            placeholder="Hi World!"
            onChange={onChange}
            value={value.body}
          />

          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
    </>
  );
};

export default PostForm;

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      createdAt
      userName
      body
      id
      commentCount
      comments {
        id
      }
      likeCount
      likes {
        userName
      }
    }
  }
`;
