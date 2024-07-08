import axios from 'axios';

export const api = axios.create({
  baseURL: "https://javat365-assessment.vercel.app/api/",
});

export default api;