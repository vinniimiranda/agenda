import { combineReducers } from 'redux'
import auth from './auth/reducer'
import user from './user/reducer'
import notifier from './notifier/reducer'

export default combineReducers({
  auth,
  user,
  notifier
})
