const jwt = require("jsonwebtoken");

module.exports = async (context) => {
  //check header available
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    //if token available than get token
    const token = authHeader.split(" ")[1];
    if (token) {
      //if token available than verify token and return data
      const user = await jwt.verify(token, "9879207104");

      return user;
    }
    //if token not availbale than throw error
    throw new Error("Token not available");
  }
  //if not available then throw error
  throw new Error("Authorization token must require");
};
