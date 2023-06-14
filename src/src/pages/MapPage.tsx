import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppParamsList } from "../routes/AppParamList";
import { BackgroundColor, WhiteColor } from "../constants/colors";
import { PrimaryButton, ReturnButton } from "../components/Buttons";
import { LeafletView, WebviewLeafletMessage, MapMarker } from 'react-native-leaflet-view';
import { Button } from "react-native-paper";

/***
 * MapPage
 */

export function MapPage(props: NativeStackScreenProps<AppParamsList, 'MapPage'>) {
  const [mapMarker, setMapMarker] = React.useState<MapMarker[]>([]);

  const [lat, setLat] = React.useState<number | undefined>();
  const [lng, setLng] = React.useState<number | undefined>();

  const readOnly = props.route.params?.readOnly;
  const onReceivePosition = props.route.params?.onReceivePosition;

  /***
   * Events
   */

  const onMessageReceived = (message: WebviewLeafletMessage) => {
    if (readOnly !== true) {
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
    }
  };

  const onConfirmPosition = React.useCallback(() => {
    if (lat !== undefined && lng !== undefined) {
      onReceivePosition?.(lat, lng);
    }
  }, [lat, lng]);

  return (
    <View style={style.rootContainer}>
      <ReturnButton onPress={() => {
        props.navigation.pop();
      }} />

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

      {readOnly !== true && <PrimaryButton
        onPress={() => onConfirmPosition()}
        disabled={mapMarker.length === 0}
        title="Confirmar posição" />}

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