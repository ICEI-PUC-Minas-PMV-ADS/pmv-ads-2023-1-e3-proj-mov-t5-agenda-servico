import React from "react";
import { TimePickerModal } from 'react-native-paper-dates';



export function TimePicker(props) {
  return (
    <TimePickerModal
      use24HourClock={true}
      inputFontSize={48}
      label='Selecione as horas'
      cancelLabel='Cancelar'
      {...props}
    />

  );
}