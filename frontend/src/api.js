import axios from "axios";

const BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const client = axios.create({
  baseURL: BASE,
});

export function setAuthToken(token) {
  if (token)
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete client.defaults.headers.common["Authorization"];
}

export default client;
