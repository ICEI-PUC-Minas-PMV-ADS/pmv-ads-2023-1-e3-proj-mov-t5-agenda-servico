import React from 'react';

import {
  StyleSheet,
  GestureResponderEvent,
  Pressable,
  Text,
} from 'react-native';

import {
  BackgroundColor,
  PrimaryColor,
  SecondaryColor,
  WhiteColor
} from '../constants/colors';

import {
  IcGoogleSvg,
  IcFacebookSvg
} from '../constants/icons';

/***
 * PrimaryButton props
 */

export interface PrimaryButtonProps {
  title: string;
  onPress?: ((event: GestureResponderEvent) => void);
}

/***
 * PrimaryButton
 */

export function PrimaryButton({ title, onPress }: PrimaryButtonProps) {
  return (
    <Pressable android_ripple={{ color: BackgroundColor }} style={style.buttonStyle}  onPress={onPress}>
      <Text style={style.textStyle}>{title}</Text>
    </Pressable>
  );
}

/***
 * Google button props
 */

export interface GoogleButtonProps {
  onPress?: ((event: GestureResponderEvent) => void);
}

/***
 * Google Button
 */

export function GoogleButton({ onPress }: GoogleButtonProps) {
  return (
    <Pressable android_ripple={{ color: BackgroundColor }} style={style.googleButton} onPress={onPress}>
      <IcGoogleSvg />
    </Pressable>
  );
}

/***
 * Facebook button props
 */

export interface FacebookButtonProps {
  onPress?: ((event: GestureResponderEvent) => void);
}

/***
 * Google Button
 */

export function FacebookButton({ onPress }: FacebookButtonProps) {
  return (
    <Pressable android_ripple={{ color: BackgroundColor }} style={style.facebookButton} onPress={onPress}>
      <IcFacebookSvg />
    </Pressable>
  );
}

/***
 * style
 */

const style = StyleSheet.create({
  buttonStyle: {
    backgroundColor: PrimaryColor,
    borderRadius: 16,
    margin: 16,
    alignItems: 'center',
    padding: 16
  },
  textStyle: {
    color: WhiteColor,
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
  },
  googleButton: {
    flex: 1,
    backgroundColor: SecondaryColor,
    borderRadius: 16,
    margin: 16,
    alignItems: 'center',
    padding: 10
  },
  facebookButton: {
    flex: 1,
    backgroundColor: SecondaryColor,
    borderRadius: 16,
    margin: 16,
    alignItems: 'center',
    padding: 10
  }
});