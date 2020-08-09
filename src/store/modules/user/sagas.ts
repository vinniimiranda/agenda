import { all, takeLatest } from 'redux-saga/effects'

import { updateCustomer as updateCustomerAction } from './actions'
import { API } from '../../../services/api'

export function updateCustomer ({ payload }: ReturnType<typeof updateCustomerAction>) {
  try {
    const { customer } = payload
    if (customer) {
      API.defaults.headers.customer = customer
    }
  } catch (error) {
  }
}

export default all([
  takeLatest('@user/UPDATE_CUSTOMER', updateCustomer)
])
