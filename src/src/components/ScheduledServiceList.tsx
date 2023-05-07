import { View, StyleSheet } from "react-native";
import { ScheduledServices } from "../models/scheduled_services";
import { ScheduledServiceView } from "./ScheduleServiceView";

/***
 * ScheduledServiceListProps
 */

type ScheduledServiceListProps = {
  data: ScheduledServices[]
};

/***
 * ScheduledServiceList
 */

export function ScheduledServiceList({ data }: ScheduledServiceListProps) {
  return (
    <View style={style.container}>
      {data.map((scheduledService) => <ScheduledServiceView key={scheduledService.id} model={scheduledService} />)}
    </View>
  );
}

/***
 * Style
 */

const style = StyleSheet.create({
  container: {
    width: '100%',
  }
});