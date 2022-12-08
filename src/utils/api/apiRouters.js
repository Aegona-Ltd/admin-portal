const baseRouter = '/api/'

export const ApiRouters = {
  LOGIN: baseRouter + 'Auth/PortalLogin',
  RESET_PASSWORD: baseRouter + 'Auth/ResetPassword',
  FORGOT_PASSWORD: baseRouter + 'Auth/ForgotPassword',


  LEARNERS: baseRouter + 'Learners',
  USERS: baseRouter + 'Users'
}
