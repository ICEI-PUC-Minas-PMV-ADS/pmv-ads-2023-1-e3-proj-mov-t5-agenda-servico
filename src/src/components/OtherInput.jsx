import React from "react"
import { PrimaryColor, WhiteColor, SecondaryColor } from "../constants/colors";
import { TextInput } from 'react-native-paper';
import { StyleSheet } from "react-native";


export function OtherInput(props) {
  return (
    <TextInput
      theme={{ colors: { onSurfaceVariant: 'white' } }}
      mode="outlined"
      style={styles.input}
      outlineColor={PrimaryColor}
      activeOutlineColor={PrimaryColor}
      textColor={WhiteColor}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: SecondaryColor,
    fontSize: 18,
    marginTop: 20
  },
}
)
