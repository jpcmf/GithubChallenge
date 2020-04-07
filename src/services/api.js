import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
  client_id: 'Iv1.50d408451479c6d9',
  client_secret: 'fc388d6e45bc26029b989b4facda3b6246eaedbd',
});

export default api;
