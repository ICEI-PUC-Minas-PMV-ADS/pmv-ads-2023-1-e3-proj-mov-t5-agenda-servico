import { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  TextInputBackgroundColor,
  TextInputColor,
  TextInputHintColor,
  TextInputIconColor,
  WhiteColor,
} from '../constants/colors';

/***
 * InputText Props
 */

interface InputTextProps {
  placeholder?: string;
  label?: string;
  value?: string;
  readonly?: boolean;
  secureTextEntry?: boolean;
  margin?: number;
  onChange?: (value: string) => void;
}

/***
 * InputText
 */

export function InputText({
  placeholder,
  label,
  value,
  readonly = false,
  secureTextEntry = false,
  margin = 12,
  onChange,
}: InputTextProps) {
  const [textValue, setTextValue] = useState("");
  useEffect(() => {
    if (value !== undefined)
      setTextValue(value);
  }, [value])

  return (
    <View style={{ margin: margin }}>
      {label !== undefined && <Text style={styles.textLabel}>{label}</Text>}
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          editable={!readonly}
          placeholderTextColor={TextInputHintColor}
          underlineColorAndroid="transparent"
          secureTextEntry={secureTextEntry}
          value={textValue}

          onChangeText={value => {
            setTextValue(value);
            onChange?.(value);
          }}
        />
      </View>
    </View>
  );
}

/***
 * InputPhoneText Props
 */

interface InputPhoneTextProps {
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}

/***
 * InputPhoneText
 */

export function InputPhoneText({
  placeholder,
  label,
  value,
  onChange,
}: InputPhoneTextProps) {
  const [textPhone, setTextPhone] = useState(value);

  useEffect(() => {
    if (value !== undefined)
      setTextPhone(value);
  }, [value])

  return (
    <View style={styles.container}>
      {label !== undefined ? (
        <Text style={styles.textLabel}>{label}</Text>
      ) : (
        <></>
      )}
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInputDDD}
          underlineColorAndroid="transparent"
          value="+55"
          editable={false}
        />
        <View style={styles.inputPhoneDivider} />
        <TextInput
          style={styles.textInput}
          keyboardType='number-pad'
          placeholder={placeholder}
          placeholderTextColor={TextInputHintColor}
          underlineColorAndroid="transparent"
          value={textPhone}
          onChangeText={value => {
            setTextPhone(value);
            onChange?.(value);
          }}
        />
      </View>
    </View>
  );
}

/***
 * InputIconText Props
 */

interface InputIconTextProps {
  placeholder?: string;
  label?: string;
  value?: string;
  iconLocation?: 'start' | 'end';
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  secureTextEntry?: boolean;
  margin?: number;
  onChange?: (value: string) => void;
  onClickIcon?: () => void;
}

/***
 * InputIconText
 */

export function InputIconText({
  placeholder,
  label,
  value,
  icon,
  iconLocation = 'start',
  secureTextEntry = false,
  margin = 12,
  onChange,
  onClickIcon,
}: InputIconTextProps) {
  const [textValue, setTextValue] = useState(value);

  useEffect(() => {
    if (value !== null) {
      setTextValue(value);
    }
  }, [value]);

  const CustomIconContainer = useCallback(() => {
    const CustomIcon = icon;
    return (
      <TouchableWithoutFeedback onPress={onClickIcon}>
        <CustomIcon style={styles.textInputIcon} />
      </TouchableWithoutFeedback>
    );
  }, [icon]);

  return (
    <View style={{ margin: margin }}>
      {label !== undefined ? (
        <Text style={styles.textLabel}>{label}</Text>
      ) : (
        <></>
      )}
      <View style={styles.textInputContainer}>
        {iconLocation === 'start' && CustomIconContainer()}
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={TextInputHintColor}
          underlineColorAndroid="transparent"
          secureTextEntry={secureTextEntry}
          value={textValue}
          onChangeText={value => {
            setTextValue(value);
            onChange?.(value);
          }}
        />
        {iconLocation === 'end' && CustomIconContainer()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
  textLabel: {
    color: TextInputColor,
    fontFamily: 'Manrope-SemiBold',
    marginStart: 4,
    marginBottom: 4,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TextInputBackgroundColor,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  textInputDDD: {
    width: 40,
    color: WhiteColor,
    textAlign: 'center',
  },
  textInput: {
    flex: 1,
    color: TextInputColor,
    fontFamily: 'Aleo-Bold',
    borderWidth: 0,
  },
  textInputIcon: {
    color: TextInputIconColor,
    marginHorizontal: 8,
  },
  inputPhoneDivider: {
    width: 1,
    height: '70%',
    marginHorizontal: 8,
    backgroundColor: TextInputHintColor,
  },
});
