import React from "react";
import { ChatMessage } from "../../../models/chat";

/***
 * ChatContextState
 */

type ChatContextState = {
  messages: ChatMessage[];
  sendMessage?: (message: string) => void;
};

/***
 * ChatContext
 */

export const ChatContext = React.createContext<ChatContextState>({ messages: [] });

export const ChatProvider = ChatContext.Provider;
export const ChatConsumer = ChatContext.Consumer;

export const useChatContext = () => React.useContext(ChatContext);