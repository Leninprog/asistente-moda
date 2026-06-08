import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const recomendarOutfit = (usuario_id, descripcion) =>
  api.post("/ia/recomendar", { usuario_id, descripcion });

export const listarPrendas = () => api.get("/catalogo/prendas");

export default api;
