import Axios from 'axios'

export const API = Axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : 'https://seu-job-api.herokuapp.com',
  headers: {
    'Content-Type': 'application/json'
  }
})
