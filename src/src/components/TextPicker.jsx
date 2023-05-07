import { Picker } from '@react-native-picker/picker';
import { OtherInput } from './OtherInput'
import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { WhiteColor } from '../constants/colors';



export function TextPicker({ inputLabel, options, selectedValue, onChange }) {
  const pickerRef = useRef(null);
  const handleTextInputPress = () => {
    pickerRef.current.focus();
  }
  return (
    <View>
      <OtherInput
        label={inputLabel}
        value={selectedValue}
        onFocus={handleTextInputPress}
        right={<TextInput.Icon icon="chevron-down" color={WhiteColor} />}
      />
      <Picker
        ref={pickerRef}
        style={styles.picker}
        selectedValue={selectedValue}
        onValueChange={onChange}
      >
        {options.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>
    </View>

  );
};

const styles = StyleSheet.create({
  picker: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
  }
});

