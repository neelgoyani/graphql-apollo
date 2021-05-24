import { createContext, useReducer, useContext } from "react";

const stateContext = createContext();

const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <stateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </stateContext.Provider>
  );
};

export const useStateValue = () => useContext(stateContext);

export default StateProvider;
