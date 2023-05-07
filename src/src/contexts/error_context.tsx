import React from 'react';
import { Animated } from 'react-native';

/***
 * Context
 */

export type ErrorState = {
  errorMessage?: string;
  containerAnim: Animated.Value;
  dispatchError: (errorMessage: string) => void;
};

export const ErrorContext = React.createContext<ErrorState>({
  containerAnim: new Animated.Value(0),
  dispatchError: () => { },
});

export const ErrorProvider = ({ children }: any) => {
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
  const containerAnim = React.useRef(new Animated.Value(0)).current;

  const dispatchError = React.useCallback((message: string) => {
    if (!errorMessage) {
      Animated.timing(containerAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setErrorMessage(message);
      setTimeout(() => {
        Animated.timing(containerAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          setErrorMessage(undefined);
        }, 300);
      }, 7000);
    }
  }, []);

  return (
    <ErrorContext.Provider value={{ errorMessage, containerAnim, dispatchError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const ErrorConsumer = ErrorContext.Consumer;

export const useErrorContext = () => {
  const errorContext = React.useContext(ErrorContext);
  return errorContext;
};
