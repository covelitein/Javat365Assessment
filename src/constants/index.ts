import axios from 'axios';

export const api = axios.create({
  baseURL: "http://javat365-assessment.vercel.app/api/",
});

export default api;