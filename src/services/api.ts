import axios from 'axios'

const apiKenzieKars = axios.create({
    baseURL: 'https://kenzie-kars.herokuapp.com/',
    timeout: 5000
})

export default apiKenzieKars