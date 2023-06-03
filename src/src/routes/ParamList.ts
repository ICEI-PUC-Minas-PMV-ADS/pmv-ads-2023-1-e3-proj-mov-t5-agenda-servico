export type AppParamsList = {
  Home: {};
  Login: {};
  Test: {};
  ClientProfile: {};
  Profile: {};
  ProfessionalProfile: {};
  RegisterRoute: {};
  Services: {};
  UpdateServices: {};
  Opening: {};
  Day: {};
  Intervalo: {};
  Where: {};
  Fees: {};
  Address: {};
  CEP: {};
  ForgotPasswordScreen: {};
  Support: {};
  Config: {};
  ChangePassword: {};
  ScheduleServiceCepPage: {id: string };
  BookingPage: { id: string };
  MapPage: {
    readOnly?: boolean;
    lat?: number;
    lng?: number;
    onReceivePosition?: (lat: number, lng: number) => void;
  };
  ChatPage: {
    scheduledServiceId: string;
    clientId: string;
    supplierId: string;
  };
};
