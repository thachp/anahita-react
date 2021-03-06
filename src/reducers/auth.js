import {
  Auth as AUTH,
  Person as PERSON,
} from '../constants';

const viewer = localStorage.getItem('viewer') ? JSON.parse(localStorage.getItem('viewer')) : {};

export default function (state = {
  emailAvailable: false,
  usernameAvailable: false,
  isFetching: false,
  isValidating: false,
  isAuthenticated: viewer.id && (
    viewer.usertype === PERSON.TYPE.REGISTERED ||
    viewer.usertype === PERSON.TYPE.ADMIN ||
    viewer.usertype === PERSON.TYPE.SUPER_ADMIN
  ),
  viewer,
  success: false,
  error: '',
}, action) {
  switch (action.type) {
    case AUTH.VALIDATE.USERNAME.REQUEST:
      return {
        ...state,
        isValidating: true,
        usernameAvailable: false,
      };
    case AUTH.VALIDATE.EMAIL.REQUEST:
      return {
        ...state,
        isValidating: true,
        emailAvailable: false,
      };
    case AUTH.LOGIN.REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        success: false,
        viewer: {},
      };
    case AUTH.VALIDATE.USERNAME.SUCCESS:
      return {
        ...state,
        isValidating: false,
        usernameAvailable: action.isAvailable,
      };
    case AUTH.VALIDATE.EMAIL.SUCCESS:
      return {
        ...state,
        isValidating: false,
        emailAvailable: action.isAvailable,
      };
    case AUTH.LOGIN.SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        success: true,
        error: '',
        viewer: localStorage.getItem('viewer') ? JSON.parse(localStorage.getItem('viewer')) : {},
      };
    case AUTH.VALIDATE.USERNAME.FAILURE:
      return {
        ...state,
        isValidating: false,
        usernameAvailable: false,
      };
    case AUTH.VALIDATE.EMAIL.FAILURE:
      return {
        ...state,
        isValidating: false,
        emailAvailable: false,
      };
    case AUTH.LOGIN.FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        success: false,
        error: action.error,
      };
    case AUTH.LOGOUT.REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true,
      };
    case AUTH.LOGOUT.SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        error: '',
      };
    case AUTH.SIGNUP.REQUEST:
    case AUTH.PASSWORD.RESET.REQUEST:
      return {
        ...state,
        isFetching: true,
        success: false,
        error: '',
      };
    case AUTH.SIGNUP.SUCCESS:
    case AUTH.PASSWORD.RESET.SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        error: '',
      };
    case AUTH.SIGNUP.FAILURE:
    case AUTH.PASSWORD.RESET.FAILURE:
      return {
        ...state,
        isFetching: false,
        success: false,
        error: action.error,
      };
    default:
      return state;
  }
}
