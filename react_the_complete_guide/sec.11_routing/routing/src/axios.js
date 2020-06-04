import axios from 'axios';

const remoteOne = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export default remoteOne;
