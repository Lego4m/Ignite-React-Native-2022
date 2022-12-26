import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.104:3333/'
});

api.interceptors.response.use((response) => {
  console.log(response);

  return response;
}, (error) => {
  console.log(error);

  return Promise.reject(error);
})

export { api };