import axios from 'axios';


export function signUp({ username, password }) {
  return axios.post('/api/auth/register', { username, password }).then(res => res.data);
}
