import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

const api2 = axios.create({
  baseURL: 'https://github-trending-api.now.sh/',
});

export { api, api2 };
