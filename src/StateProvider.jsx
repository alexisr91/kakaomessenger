import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { auth } from "./firebase";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user?.uid ? user : null);
      }
    }),
      [user];
  });

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
