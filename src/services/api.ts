import Axios from 'axios'

export const API = Axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : 'https://med-agenda-api.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json'
  }
})
