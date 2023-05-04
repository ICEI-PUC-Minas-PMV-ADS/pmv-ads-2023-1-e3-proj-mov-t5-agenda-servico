/**
 * LoginState
 */

export type LoginState = {
  showPassword: boolean;
  email: string;
  password: string;
  remember: boolean;
  isCheckingAuth: boolean;
  isCheckingUserData: boolean;
};

/**
 * Action
 */

export interface LoginAction {
  type: "set_show_password" | "set_email" | "set_password" | "set_remember" | "set_is_checking_auth" | "set_is_checking_user_data" | "login";
  payload: any;
}

/***
 * LoginInitialState
 */

export const LoginInitialState: LoginState = {
  showPassword: false,
  email: '',
  password: '',
  remember: false,
  isCheckingAuth: false,
  isCheckingUserData: true,
};

/***
 * LoginReducer
 */

export function LoginReducer(prevState: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case 'set_email': return { ...prevState, email: action.payload };
    case 'set_password': return { ...prevState, password: action.payload };
    case 'set_is_checking_auth': return { ...prevState, isCheckingAuth: action.payload };
    case 'set_is_checking_user_data': return { ...prevState, isCheckingUserData: action.payload };
    case 'set_remember': return { ...prevState, remember: action.payload };
    case 'set_show_password': return { ...prevState, showPassword: action.payload };
    case 'login':
      break;
  }
  return prevState;
}