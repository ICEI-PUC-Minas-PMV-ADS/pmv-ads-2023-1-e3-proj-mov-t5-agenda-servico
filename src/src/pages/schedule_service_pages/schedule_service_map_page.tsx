import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LeafletView, WebviewLeafletMessage, MapMarker } from 'react-native-leaflet-view';
import { Button } from "react-native-paper";
import { ReturnButton, PrimaryButton } from "../../components/Buttons";
import { BackgroundColor, WhiteColor } from "../../constants/colors";
import { AppParamsList } from "../../routes/AppParamList";
import { ScheduleServiceContext } from "./schedule_service_context";

/***
 * MapPage
 */

export function ScheduleServiceMapPage({ navigation }: NativeStackScreenProps<AppParamsList, 'ScheduleServiceMapPage'>) {
  const [mapMarker, setMapMarker] = React.useState<MapMarker[]>([]);

  const [lat, setLat] = React.useState<number | undefined>();
  const [lng, setLng] = React.useState<number | undefined>();

  const { dispatch } = React.useContext(ScheduleServiceContext);

  const hasSelectedPosition = lat !== undefined && lng !== undefined;

  /***
   * Events
   */

  const onMessageReceived = (message: WebviewLeafletMessage) => {
    if (message.event === "onMapClicked") {
      const { lat: markerLat, lng: markerLng } = message.payload?.touchLatLng;

      setMapMarker([{
        icon: 'x',
        position: {
          lat: markerLat,
          lng: markerLng
        },
        size: [32, 32],
        iconAnchor: {
          x: 4,
          y: 24,
        }
      }]);

      setLat(markerLat);
      setLng(markerLng);
    }
  };

  const onConfirmPosition = React.useCallback(() => {
    navigation.navigate("ScheduleServiceConfirmPage", {})
    dispatch?.({ type: "set_lat_lng", payload: { lat: lat, lng: lng } });
  }, [lat, lng]);

  const onJumpPosition = React.useCallback(() => {
    navigation.navigate("ScheduleServiceConfirmPage", {});
  }, [lat, lng]);

  return (
    <View style={style.rootContainer}>
      <Text style={style.title}>Mapa</Text>

      <View style={{ flex: 1 }}>
        <LeafletView
          androidHardwareAccelerationDisabled={false}
          onMessageReceived={onMessageReceived}
          mapCenterPosition={mapMarker.length === 0 ? { lat: -13.3000, lng: -47.1258 } : mapMarker[0]}
          mapMarkers={mapMarker}
          doDebug={false}
          zoom={5}
        />
      </View>

      {
        hasSelectedPosition
          ? <PrimaryButton
            onPress={() => onConfirmPosition()}
            title="Confirmar posição" />
          : <PrimaryButton
            onPress={() => onJumpPosition()}
            title="Continuar sem posição" />
      }

    </View>
  );
}

/***
 * Style
 */

const style = StyleSheet.create({
  rootContainer: {
    backgroundColor: BackgroundColor,
    padding: 16,
    flex: 1,
  },
  title: {
    color: WhiteColor,
    fontSize: 28,
    fontFamily: 'Aleo-Regular',
    marginTop: 32,
  }
});