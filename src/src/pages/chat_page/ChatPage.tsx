import React from "react";

import { View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppParamsList } from "../../routes/AppParamList";
import { Chat, ChatMessage } from "../../models/chat";
import { useAppContext } from "../../contexts/app_context";
import { QueryChatByUserAndScheduledService } from "../../repositories/queries/query_chat_by_user_and_scheduled_service";
import { BackgroundColor } from "../../constants/colors";
import { ActivityIndicator } from "react-native-paper";
import { IcEmptyChat } from "../../constants/icons";
import { ChatWrite } from "./components/chat_write";
import { ChatMessages } from "./components/chat_messages";
import { ChatProvider } from "./context/chat_context";
import { ChatRepository } from './../../repositories/chat_repository';
import { SafeAreaView } from "react-native-safe-area-context";

/***
 * ChatPage
 */

export function ChatPage({ route }: NativeStackScreenProps<AppParamsList, 'ChatPage'>) {
  const [chat, setChat] = React.useState<Chat | undefined>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const scheduledServiceId = route?.params?.scheduledServiceId;
  const clientId = route?.params?.clientId;
  const supplierId = route?.params?.supplierId;
  const appContext = useAppContext();
  const userId = appContext.user?.id;
  const userType = appContext.user?.tipo;
  const chatRepository = new ChatRepository();

  const sendMessage = React.useCallback((message: string) => {
    const chatMessage = new ChatMessage();
    chatMessage.sender_fk = userId;
    chatMessage.message = message;

    if (chat === undefined) {
      const newChat = new Chat();
      newChat.scheduled_service_fk = scheduledServiceId;
      newChat.cliente_fk = clientId;
      newChat.prestador_servico_fk = supplierId;
      newChat.data_criacao = new Date();
      newChat.mensagens = [chatMessage];
      chatRepository.create(newChat, (serverChat) => {
        if (serverChat) {
          setChat(serverChat);
          setMessages(serverChat.mensagens ?? []);
        }
      });
    } else {
      chatRepository.sendMessage(chat, chatMessage, (serverMessage) => {
        setMessages(oldMessages => [...oldMessages, serverMessage]);
      });
    }
  }, [userId, userType, chat, scheduledServiceId, clientId, supplierId]);

  const update = React.useCallback(() => {
    if (userId && scheduledServiceId) {
      setTimeout(() => {
        new QueryChatByUserAndScheduledService()
          .query(userId, scheduledServiceId)
          .then((chat) => {
            if (chat?.mensagens) {
              setChat(chat);
              setMessages(chat.mensagens);
            }
            update();
          });
      }, 30000);
    }
  }, [userId, scheduledServiceId]);


  React.useEffect(() => {
    if (userId && scheduledServiceId) {
      new QueryChatByUserAndScheduledService()
        .query(userId, scheduledServiceId)
        .then((chat) => {
          if (chat?.mensagens) {
            setChat(chat);
            setMessages(chat.mensagens);
          }
          setLoading(false);
        });
    }
    update();
  }, [userId, scheduledServiceId]);

  return (
    <ChatProvider value={{ messages, sendMessage }}>
      <SafeAreaView style={style.container}>
        {
          loading
            ? <View style={style.loadingContainer}><ActivityIndicator /></View>
            : (
              messages.length === 0
                ? (
                  <View style={{ flexDirection: 'column', flex: 1 }}>
                    <View style={style.emptyContainer}><IcEmptyChat /></View>
                    <View style={{ flex: 0 }}><ChatWrite /></View>
                  </View>
                ) : (
                  <View style={{ flexDirection: 'column', flex: 1 }}>
                    <ChatMessages userId={userId!} />
                    <ChatWrite />
                  </View>
                )
            )
        }
      </SafeAreaView>
    </ChatProvider>
  );
}

/***
 * Style
 */

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});