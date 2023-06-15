import axios from 'axios'

const apiKenzieKars = axios.create({
    baseURL: 'https://kenzie-kars.herokuapp.com/api',
    timeout: 5000
})

export const api = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000
})

export const apiCep = axios.create({
    baseURL: 'https://viacep.com.br/ws',
    timeout: 5000
})

export default apiKenzieKars
