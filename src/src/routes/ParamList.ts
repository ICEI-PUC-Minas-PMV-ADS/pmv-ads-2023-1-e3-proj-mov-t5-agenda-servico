export type AppParamsList = {
  Home: {};
  Login: {};
  Test: {};
  ClientProfile: {};
  ProfessionalProfile: {};
  RegisterRoute: {};
  ForgotPasswordScreen: {},
  Support: {},
  Config: {},
  ChangePassword: {},
  BookingPage: { id: string },
  MapPage: {
    readOnly?: boolean;
    lat?: number;
    lng?: number;
    onReceivePosition?: (lat: number, lng: number) => void;
  }
};
