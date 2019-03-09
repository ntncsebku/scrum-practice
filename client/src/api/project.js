import axios from 'axios';
import { loadAuthToken } from '../utils/localStorage';


export function addItemToProject({ projectId, colId, title, description }) {
  return axios.post(`/api/project/m/${projectId}/col/${colId}/item/add`, { note: description, title }, {
    headers: {
      authorization: loadAuthToken()
    }
  }).then(res => res.data);
}


export function fetchProject({ projectId }) {
  return axios.get(`/api/project/${projectId}`).then(res => res.data);
}


export function invite({ projectId, username }) {
  return axios.post(`/api/project/m/${projectId}/invite`, {
    membername: username
  }, {
    headers: {
      authorization: loadAuthToken()
    }
  }).then(res => res.data);
}
