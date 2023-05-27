import React from 'react';
import { User } from '../models/user';

/***
 * Context
 */

type AppContextState = {
  user?: User;
  setUser: (user: User | undefined) => void;
};

export const AppContext = React.createContext<AppContextState>({
  setUser: (user: User | undefined) => { },
});

export const AppProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<User | undefined>();
  return (
    <AppContext.Provider value={{
      user,
      setUser,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const AppConsumer = AppContext.Consumer;

export const useAppContext = () => {
  const appContext = React.useContext(AppContext);
  return appContext;
};
