import { OtherInput } from './OtherInput'
import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { TextInput } from 'react-native-paper';
import { WhiteColor } from '../constants/colors';
import { TimePickerModal } from 'react-native-paper-dates';




export function TimeTextPicker({ inputLabel, onTimeChange, time, setTime }) {
  const [visible, setVisible] = React.useState(false)
  
  const hoursConvert = (hours) => {
    if (hours == 0) {
      return ('')
    }
    else {
      return (`${hours}h`)
    }
  }

  const minutesConvert = (minutes) => {
    if (minutes == 0) {
      return ('')
    }
    else {
      return (`${minutes}min`)
    }
  }

  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      const newTime = { hours, minutes }
      const convertTime = `${hoursConvert(hours)} ${minutesConvert(minutes)}`
      setVisible(false);
      setTime(convertTime);
      if (onTimeChange) {
        onTimeChange(newTime)
      }

    },
    [setVisible]
  );
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <View>
          <OtherInput
            label={inputLabel}
            value={time}
            right={<TextInput.Icon icon="chevron-down" color={WhiteColor} />}
            editable={false}
          />
        </View>
      </TouchableWithoutFeedback>
      <TimePickerModal
        use24HourClock={true}
        inputFontSize={48}
        label='Selecione o tempo'
        cancelLabel='Cancelar'
        visible={visible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={0}
        minutes={30}
      />
    </View>
  );
};

