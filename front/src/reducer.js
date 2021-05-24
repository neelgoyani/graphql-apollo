import jwt_decode from "jwt-decode";

export const initialState = {
  user: null,
};

if (localStorage.getItem("token")) {
  const decodedToken = jwt_decode(localStorage.getItem("token"));

  if (decodedToken) {
    initialState.user = decodedToken.userName;
  }
}

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.user,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return {
        ...state,
      };
  }
};
