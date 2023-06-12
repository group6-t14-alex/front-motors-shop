import axios from 'axios'

const apiKenzieKars = axios.create({
    baseURL: 'https://kenzie-kars.herokuapp.com/api',
    timeout: 5000
})

export default apiKenzieKars