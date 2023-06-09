import React from 'react';

import { StyleSheet, GestureResponderEvent, Pressable, Text, Button, View } from 'react-native';


import {
  BackgroundColor,
  PrimaryColor,
  PrimaryColorDark,
  SecondaryColor,
  TextInputColorDark,
  WhiteColor,
} from '../constants/colors';

import { IcGoogleSvg, IcFacebookSvg, IcBackArrow } from '../constants/icons';



/***
 * PrimaryButton props
 */

export interface PrimaryButtonProps {
  title: string;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

/***
 * PrimaryButton
 */

export function PrimaryButton({
  title,
  disabled = false,
  onPress,
}: PrimaryButtonProps) {
  return (
    <Pressable
      android_ripple={{ color: BackgroundColor }}
      style={[
        style.buttonStyle,
        { backgroundColor: disabled ? PrimaryColorDark : PrimaryColor },
      ]}
      disabled={disabled}
      onPress={onPress}>
      <Text
        style={[
          style.textStyle,
          { color: disabled ? TextInputColorDark : WhiteColor },
        ]}>
        {title}
      </Text>
    </Pressable>
  );
}

/***
 * Google button props
 */

export interface GoogleButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
}

/***
 * Google Button
 */

export function GoogleButton({ onPress }: GoogleButtonProps) {
  return (
    <Pressable
      android_ripple={{ color: BackgroundColor }}
      style={style.googleButton}
      onPress={onPress}>
      <IcGoogleSvg />
    </Pressable>
  );
}

/***
 * Facebook button props
 */

export interface FacebookButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
}

/***
 * Google Button
 */

export function FacebookButton({ onPress }: FacebookButtonProps) {
  return (
    <Pressable
      android_ripple={{ color: BackgroundColor }}
      style={style.facebookButton}
      onPress={onPress}>
      <IcFacebookSvg />
    </Pressable>
  );
}

/**
 * Return button 
 */
export interface ReturnButtonProps {
  onPress?: (event: GestureResponderEvent) => void;

}

export function ReturnButton({ onPress }: ReturnButtonProps) {
  return (
    <Pressable
      onPress={onPress}
    >
      <View style={style.returnButton}>
        <IcBackArrow />
        <Text style={style.textReturn}> Voltar</Text>
      </View>
    </Pressable>
  )

}

/***
 * Delete Button
 */

export function DeleteButton({ title, disabled = false, onPress }: PrimaryButtonProps) {
  return (
    <Pressable android_ripple={{ color: BackgroundColor }} style={[style.buttonStyle, { backgroundColor: disabled ? PrimaryColorDark : 'red' }]} disabled={disabled} onPress={onPress}>
      <Text style={[style.textStyle, { color: disabled ? TextInputColorDark : WhiteColor }]}>{title}</Text>
    </Pressable>
  );
}

/***
 * style
 */

const style = StyleSheet.create({
  buttonStyle: {
    borderRadius: 16,
    margin: 16,
    alignItems: 'center',
    padding: 16,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
  },
  googleButton: {
    flex: 1,
    backgroundColor: SecondaryColor,
    borderRadius: 16,
    margin: 16,
    alignItems: 'center',
    padding: 10,
  },
  facebookButton: {
    flex: 1,
    backgroundColor: SecondaryColor,
    borderRadius: 16,
    margin: 16,
    alignItems: 'center',
    padding: 10,
  },
  returnButton: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  textReturn: {
    color: WhiteColor,
    fontSize: 22,
    fontFamily: 'Manrope-SemiBold',

  }

});
