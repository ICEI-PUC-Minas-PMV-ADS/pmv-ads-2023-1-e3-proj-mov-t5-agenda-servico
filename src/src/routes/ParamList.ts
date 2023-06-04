export type AppParamsList = {
  Home: {};
  Login: {};
  Test: {};
  ClientProfile: {};
  Profile: {};
  ProfessionalProfile: {};
  ScheduleServiceConfirmPage: {};
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
  CategorySelector: {};
  Support: {};
  Config: {};
  ChangePassword: {};
  ScheduleServiceCepPage: { id: string };
  BookingRoutes: { id: string };
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
