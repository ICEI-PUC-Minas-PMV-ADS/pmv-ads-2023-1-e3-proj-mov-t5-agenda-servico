import React from 'react';
import { Animated } from 'react-native';

/***
 * Context
 */

export type MessageState = {
  message?: { type: "error" | "notificatiton", message: string };
  containerAnim: Animated.Value;
  dispatchMessage: ({ type, message }: { type: "error" | "notificatiton", message: string }) => void;
};

export const MessageContext = React.createContext<MessageState>({
  containerAnim: new Animated.Value(0),
  dispatchMessage: () => { },
});

export const MessageProvider = ({ children }: any) => {
  const [message, setMessage] = React.useState<{ type: "error" | "notificatiton", message: string } | undefined>();
  const containerAnim = React.useRef(new Animated.Value(0)).current;

  const dispatchMessage = React.useCallback((receivedMessage: { type: "error" | "notificatiton", message: string }) => {
    if (!message) {
      Animated.timing(containerAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setMessage({ ...receivedMessage });
      setTimeout(() => {
        Animated.timing(containerAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          setMessage(undefined);
        }, 300);
      }, 7000);
    }
  }, [message]);

  return (
    <MessageContext.Provider value={{ message, containerAnim, dispatchMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const MessageConsumer = MessageContext.Consumer;

export const useMessageContext = () => {
  return React.useContext(MessageContext);
};
