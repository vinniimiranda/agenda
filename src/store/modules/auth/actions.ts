export function signInRequest (email: string, password: string) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password }
  }
}
export function signUpRequest (form) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: form
  }
}

export function signInSuccess (token: string, user: object) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user }
  }
}

export function signFailure () {
  return {
    type: '@auth/SIGN_FAILURE'
  }
}

export function signOut () {
  return {
    type: '@auth/SIGN_OUT'
  }
}

export function resetPasswordRequest (email, senhaAtual, senha) {
  return {
    type: '@auth/RESET_PASSWORD_REQUEST',
    payload: { email, senhaAtual, senha }
  }
}
