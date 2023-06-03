import { ScrollView, StyleSheet, View } from "react-native";
import { useChatContext } from "../context/chat_context";
import { ChatMessage } from "./chat_message";

/***
 * ChatMessagesProps
 */

type ChatMessagesProps = {
  userId: string;
};

/***
 * ChatMessages
 */

export function ChatMessages({ userId }: ChatMessagesProps) {
  const { messages } = useChatContext();
  return (
    <View style={style.container}>
      <ScrollView>
        {messages.map((message, index) => <ChatMessage key={index} message={message} userId={userId} />)}
      </ScrollView>
    </View>
  );
}

/***
 * Style
 */

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});