import axios from 'axios' 
const axiosInstance = axios.create({ 
  baseURL: 'https://localhost:5001/api/Users' 
})
export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}
export { axiosInstance }