import Axios from 'axios'

export const API = Axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://seu-job-api.herokuapp.com' : 'http://192.168.0.104:3333',
  headers: {
    'Content-Type': 'application/json'
  }
})
