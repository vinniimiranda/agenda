import Axios from 'axios'

export const API = Axios.create({
  baseURL: 'https://seu-job-api.herokuapp.com',
  headers: {
    'Content-Type': 'application/json'
  }
})
