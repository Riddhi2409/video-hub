import axios from 'axios'
console.log(process.env.REACT_APP_YT_API_KEY)
const request = axios.create({
   baseURL: 'https://youtube.googleapis.com/youtube/v3/',
   params: {
      key: 'AIzaSyAW7cbn0G2EQWKwkyB5XVNW5dylIA5oK3Q',
   },
})

export default request
