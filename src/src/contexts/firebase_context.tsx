import React from "react";

import { firebase } from "../FirebaseApp";

/***
 * Context
 */

export const FirebaseContext = React.createContext({ firebase });

export const FirebaseProvider = ({ children }: any) => (
  <FirebaseContext.Provider value={{ firebase }}>{children}</FirebaseContext.Provider>
);

export const useFirebase = () => {
  const firebaseContext = React.useContext(FirebaseContext);
  return firebaseContext.firebase;
};