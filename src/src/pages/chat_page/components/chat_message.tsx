import { StyleSheet, View } from "react-native";
import { ChatMessage as ChatMessageModel } from "../../../models/chat";
import { Text } from "react-native-paper";
import { BlackColor, PrimaryColor, SecondaryColor, WhiteColor } from "../../../constants/colors";

/***
 * ChatMessageProps
 */

type ChatMessageProps = {
  userId: string;
  message: ChatMessageModel;
};

/***
 * ChatMessage
 */

export function ChatMessage({ userId, message }: ChatMessageProps) {
  const isOwner = userId === message.sender_fk;
  return (
    <View style={[style.messageContainer, { justifyContent: isOwner ? 'flex-start' : 'flex-end' }]}>
      <View style={isOwner ? style.ownMessage : style.commonMessage}>
        <Text style={{ color: isOwner ? BlackColor : WhiteColor, textAlign: isOwner ? 'left' : 'right' }}>{message.message}</Text>
      </View>
    </View>
  );
}

/***
 * Style
 */

const style = StyleSheet.create({
  messageContainer: {
    width: '100%',
    margin: 8,
  },
  ownMessage: {
    width: '90%',
    backgroundColor: PrimaryColor,
    borderWidth: 1,
    borderColor: '#444',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  commonMessage: {
    width: '90%',
    backgroundColor: SecondaryColor,
    borderWidth: 1,
    borderColor: '#444',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});