import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const client = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ConditionsApi = {
  //getConditions
  // list: async (userId) => {
  //     const res=await client.get(`/api/conditions`, { params: userId ? { userId } : {} });
  //     return res.data;
  // },
  list: async (userId) => {
    if (!userId) throw new Error("userId is required");
    const res = await client.get("/api/conditions", {
      params: { userId },
    });
    return res.data;
  },
  create: async (payload) => {
    if (!payload.userId)
      throw new Error("userId is required when creating a condition");
    const res = await client.post("/api/conditions", payload);
    return res.data;
  },
  //createCondition
//   create: async (payload) => {
//     const res = await client.post(`/api/conditions`, payload);
//     return res.data;
//   },
  //updateCondition
  update: async (id, payload) => {
    const res = await client.put(`/api/conditions/${id}`, payload);
    return res.data;
  },
  //deleteCondition
  delete: async (id) => {
    const res = await client.delete(`/api/conditions/${id}`);
    return res.data;
  },
};

// export const getConditions = (userId) => API.get(`/conditions/${userId}`);
// export const createCondition = (data) => API.post("/conditions", data);
// export const getHealthLogs = (conditionId) => API.get(`/healthlogs/${conditionId}`);
// export const createHealthLog = (data) => API.post("/healthlogs", data);
