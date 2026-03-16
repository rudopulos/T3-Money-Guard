import axios from 'axios';

const env = globalThis.process?.env ?? {};

export const API_BASE_URL =
  env.REACT_APP_API_BASE_URL || 'https://moneyguardbackend.onrender.com/';

axios.defaults.baseURL = API_BASE_URL;

export default axios;
