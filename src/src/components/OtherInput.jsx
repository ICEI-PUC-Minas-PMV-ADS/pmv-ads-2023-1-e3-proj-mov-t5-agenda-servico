import React from "react"
import { PrimaryColor, WhiteColor, SecondaryColor } from "../constants/colors";
import { TextInput } from 'react-native-paper';
import { StyleSheet } from "react-native";


export function OtherInput(props) {
  const color = () => {
    if (!props.desativado || props.desativado == false) {
      return '#FFFFFF'
    }
    else {
      return '#A9A9A9'
    }
  }

  return (
    <TextInput
      theme={{ colors: { onSurfaceVariant: color() } }}
      mode="outlined"
      style={styles.input}
      outlineColor={PrimaryColor}
      activeOutlineColor={PrimaryColor}
      textColor={color()}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: SecondaryColor,
    fontSize: 18,
    fontFamily: 'Arial',
  },
}
)
