import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const client = axios.create({ baseURL: API, headers: { "Content-Type": "application/json" } });

export const HealthLogsApi = {
  list: async (userId, conditionId) => {
    const params = {};
    if (userId) params.userId = userId;
    if (conditionId) params.conditionId = conditionId;
    const res = await client.get("/api/healthlogs", { params });
    return res.data;
  },
  create: async (payload) => {
    const res = await client.post("/api/healthlogs", payload);
    return res.data;
  },
  update: async (id, payload) => {
    const res = await client.put(`/api/healthlogs/${id}`, payload);
    return res.data;
  },
  delete: async (id) => {
    const res = await client.delete(`/api/healthlogs/${id}`);
    return res.data;
  },
};
