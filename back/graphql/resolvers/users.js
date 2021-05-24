const User = require("../../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserInputError } = require("apollo-server");

const { validateUserInput, loginValidation } = require("../../util/validators");

const transformUSer = (data) => {
  return {
    id: data.id,
    userName: data.userName,
    email: data.email,
    token: data.token,
    createdAt: data.createdAt,
  };
};

module.exports = {
  Mutation: {
    login: async (_, { userName, password }) => {
      const { errors, valid } = loginValidation({ userName, password });
      if (!valid) {
        throw new UserInputError("Error!", { errors });
      }

      //if valid check user found
      const user = await User.findOne({ userName });
      if (!user) {
        throw new UserInputError("User not found", {
          errors: {
            userName: "username not found please register first",
          },
        });
      }

      //if user found then match password with bcrypt
      const match = await bcrypt.compare(password, user.password);

      //if not match throw error
      if (!match) {
        throw new UserInputError("Please enter valid password", {
          errors: {
            password: "Enter valid password",
          },
        });
      }

      // if match then generate token and return user object
      const token = await jwt.sign(
        { userName: user.userName, email: user.email, _id: user._id },
        "9879207104"
      );
      console.log(
        transformUSer({
          userName: user.userName,
          email: user.email,
          createdAt: user.createdAt,
          token: token,
        })
      );
      return transformUSer({
        userName: user.userName,
        email: user.email,
        createdAt: user.createdAt,
        id: user._id,
        token: token,
      });
    },

    createUser: async (
      _,
      { userInput: { userName, email, password, confirmPassword } }
    ) => {
      console.log(userName);
      const { errors, valid } = await validateUserInput({
        userName,
        email,
        password,
        confirmPassword,
      });

      console.log(errors, valid);
      if (!valid) {
        throw new UserInputError("Error", { errors });
      }

      const user = await User.findOne({ userName: userName });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            userName: "This username is already taken",
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUSer = new User({
        userName,
        email,
        password,
        createdAt: new Date().toISOString(),
      });
      const response = await newUSer.save();
      console.log(response);

      const token = jwt.sign(
        {
          email: response.email,
          userName: response.userName,
          _id: response._id,
        },
        "9879207104",
        { expiresIn: "1h" }
      );

      return transformUSer({
        userName: response.userName,
        email: response.email,
        createdAt: response.createdAt,
        id: response._id,
        token: token,
      });
    },
  },
};
