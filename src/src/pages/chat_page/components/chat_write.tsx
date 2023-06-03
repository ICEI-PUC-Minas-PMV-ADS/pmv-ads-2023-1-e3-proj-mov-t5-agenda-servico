import React from "react";

import { StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { PrimaryColor } from "../../../constants/colors";
import { IcIndexScheduleServiceViewMessage } from "../../../constants/icons";
import { useChatContext } from "../context/chat_context";

/***
 * ChatWrite
 */

export function ChatWrite() {
  const [message, setMessage] = React.useState<string>("");
  const { sendMessage } = useChatContext();

  const onSendMessage = React.useCallback(() => {
    if (message.trim().length > 0) {
      sendMessage?.(message);
      setMessage("");
    }
  }, [message]);

  return (
    <View>
      <View style={style.inputContainer}>
        <TextInput
          style={style.textInput}
          placeholder="Mensagem"
          onChangeText={value => setMessage(value)}
          value={message}
        />

        <TouchableWithoutFeedback onPress={() => onSendMessage()}>
          <IcIndexScheduleServiceViewMessage />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

/***
 * Style
 */

const style = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 16,
    margin: 16,
    backgroundColor: PrimaryColor
  },
  textInput: {
    flex: 1,
  },
});