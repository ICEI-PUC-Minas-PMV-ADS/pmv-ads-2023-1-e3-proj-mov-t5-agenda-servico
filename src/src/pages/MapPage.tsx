import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppParamsList } from "../routes/AppParamList";
import { BackgroundColor, WhiteColor } from "../constants/colors";
import { PrimaryButton, ReturnButton } from "../components/Buttons";
import { LeafletView, WebviewLeafletMessage, MapMarker } from 'react-native-leaflet-view';

/***
 * MapPage
 */

export function MapPage(props: NativeStackScreenProps<AppParamsList, 'MapPage'>) {
  const [mapMarker, setMapMarker] = React.useState<MapMarker[]>([]);
  const [mapCenter, setMapCenter] = React.useState<{ lat: number, lng: number }>({ lat: -13.3000, lng: -47.1258 });
  const [mapZoom, setMapZoom] = React.useState<number>(5);

  const [lat, setLat] = React.useState<number | undefined>(props.route.params?.lat);
  const [lng, setLng] = React.useState<number | undefined>(props.route.params?.lng);

  const readOnly = props.route.params?.readOnly;
  const onReceivePosition = props.route.params?.onReceivePosition;

  React.useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      setTimeout(() => {
        setMapMarker([{
          icon: 'x',
          position: {
            lat: lat,
            lng: lng
          },
          size: [32, 32],
          iconAnchor: {
            x: 4,
            y: 24,
          }
        }]);

        setTimeout(() => {
          setMapCenter({ lat: lat, lng: lng });
          setTimeout(() => {
            setMapZoom(15);
          }, 300);
        }, 300);
      }, 200);
    }
  }, [lat, lng]);

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
      props.navigation.navigate({
        name: 'Address',
        params: {
          lat: lat,
          lng: lng,
        },
        merge: true,
      });
    } else {
      props.navigation.goBack();
    }
  }, [lat, lng]);

  return (
    <View style={style.rootContainer}>
      <Text style={style.title}>Mapa</Text>

      <View style={{ flex: 1 }}>
        <LeafletView
          androidHardwareAccelerationDisabled={false}
          onMessageReceived={onMessageReceived}
          mapCenterPosition={mapCenter}
          mapMarkers={mapMarker}
          doDebug={false}
          zoom={mapZoom}
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