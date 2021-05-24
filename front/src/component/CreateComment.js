import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Form } from "semantic-ui-react";

const CreateComment = ({ postId }) => {
  const [body, setBody] = useState("");

  const [createComment] = useMutation(CREATE_COMMENT, {
    update() {
      setBody("");
    },
    variables: { postId: postId, body: body },
  });

  return (
    <>
      <Form onSubmit={createComment}>
        <div className="ui action fluid input">
          <input
            placeholder="Comment.."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button
            type="submit"
            className="ui button teal"
            disabled={body.trim() === ""}
          >
            Submit
          </button>
        </div>
      </Form>
    </>
  );
};

export default CreateComment;

const CREATE_COMMENT = gql`
  mutation createComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      commentCount
      comments {
        id
        userName
        body
        createdAt
      }
      userName
    }
  }
`;
