import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { AppParamsList } from "../routes/AppParamList";
import { BackgroundColor, TextInputHintColor, WhiteColor } from "../constants/colors";
import { useAppContext } from "../contexts/app_context";
import { Notification } from "../models/notification";
import { Text } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { UserRepository } from "../repositories/user_repository";

/**
 * NotificationPage
 */

export function NotificationPage(props: NativeStackScreenProps<AppParamsList, 'NotificationPage'>) {
  const [loading, setLoading] = React.useState(true);
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  const navigation = useNavigation<NavigationProp<AppParamsList>>();
  const appContext = useAppContext();

  React.useEffect(() => {
    if (appContext.user) {
      const userRepo = new UserRepository();
      userRepo.getNotifications(appContext.user, (notifications) => {
        userRepo.markAsReadedNotifications(appContext.user!, [...notifications], (_) => {
          setNotifications(notifications);
          setLoading(false);
        });
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login', params: {} }]
      });
    }
  }, [appContext.user]);

  return (
    <View style={style.container}>
      {
        loading
          ? <View style={style.loadingContainer}><ActivityIndicator /></View>
          : (
            <ScrollView style={style.scrollContainer}>
              {
                notifications
                  .sort((a, b) => {
                    const time_a = a.data_criacao?.getTime() ?? 0;
                    const time_b = b.data_criacao?.getTime() ?? 0;
                    return time_a - time_b;
                  })
                  .map((notification, index) => {
                    const isReaded = notification?.readed === true;
                    const textStyle = isReaded ? style.notificationTextReaded : style.notificationText;
                    return (
                      <View key={index} style={style.notification}>
                        <Text style={textStyle}>{notification.title}</Text>
                        <Text style={textStyle}>{notification.message}</Text>
                      </View>
                    );
                  }
                  )
              }
            </ScrollView>
          )
      }

    </View>
  );
}

/**
 * Styles
 */

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },
  scrollContainer: {
    position: 'relative',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BackgroundColor
  },
  notification: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 5,
    backgroundColor: '#232938',
    padding: 20,
    marginBottom: 20,
    alignItems: 'flex-start',
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
  },
  notificationText: {
    color: WhiteColor,
  },
  notificationTextReaded: {
    color: TextInputHintColor,
  }
});