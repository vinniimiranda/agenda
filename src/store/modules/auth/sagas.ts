
import { takeLatest, call, put, all } from 'redux-saga/effects'
import { signInSuccess, signFailure, signInRequest, resetPasswordRequest, signUpRequest } from './actions'
import { API } from '../../../services/api'
import history from '../../../services/history'
import { RootState } from '../../../types/state'
import { enqueueSnackbar, closeSnackbar } from '../notifier/actions'

export function* signIn ({ payload }: ReturnType<typeof signInRequest>) {
  try {
    const response = yield call(API.post, 'login', payload)

    const { token } = response.data
    API.defaults.headers.Authorization = `Bearer ${token}`

    yield put(signInSuccess(token, { ...response.data }))

    yield put(closeSnackbar(null))

    history.push('/home')
  } catch (error) {
    if (error.response?.data?.errors) {
      yield put(enqueueSnackbar({
        message: error.response.data.errors[0].message,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error'
        }
      }))
    } else {
      yield put(enqueueSnackbar({
        message: 'Internal server error',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error'
        }
      }))
    }

    yield put(signFailure())
  }
}
export function* signUp ({ payload }: ReturnType<typeof signUpRequest>) {
  try {
    const response = yield call(API.post, 'register', payload)

    yield put(enqueueSnackbar({
      message: response.data.message,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'success'
      }
    }))

    setTimeout(() => history.push('/'), 1500)
    // yield put(signInRequest(payload.email, payload.password))
  } catch (error) {
    yield put(enqueueSnackbar({
      message: error.response.data.errors[0].message,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error'
      }
    }))
  }
}

export function getState (payload: RootState) {
  return {
    type: 'persist/REHYDRATE',
    payload: { auth: payload.auth, user: payload.user }
  }
}

export function* resetPassword ({ payload }: ReturnType<typeof resetPasswordRequest>) {
  try {
    const form = {
      email: payload.email,
      senhaAtual: payload.senhaAtual,
      senha: payload.senha
    }

    const response = yield call(API.post, 'reset', form)

    if (response.status === 200) {
      yield put(signInRequest(form.email, payload.senha))
    }
  } catch (error) {
    yield put(signFailure())
  }
}

export function setToken ({ payload }: ReturnType<typeof getState>) {
  if (!payload) return

  const { token } = payload.auth

  if (token) {
    API.defaults.headers.Authorization = `Bearer ${token}`
  }
}

export function* signOut () {
  yield call(API.post, 'logout')
  history.push('/')
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('@auth/RESET_PASSWORD_REQUEST', resetPassword)
])
