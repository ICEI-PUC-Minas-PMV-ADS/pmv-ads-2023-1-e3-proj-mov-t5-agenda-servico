export type AppParamsList = {
  Home: {};
  Login: {};
  Test: {};
  ClientProfile: {};
  Profile: {};
  ProfessionalProfile: {};
  RegisterRoute: {};
  ForgotPasswordScreen: {};
  Support: {};
  ChangePassword: {};
  Services: {};
  UpdateServices: {};
  Opening: {};
  Day: {};
  Intervalo: {};
  Where: {};
  BookingPage: { id: string };
  Fees: {};
  Config: {};
  Address: {};
  CEP: {};
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
