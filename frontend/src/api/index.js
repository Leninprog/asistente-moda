import axios from "axios";
 
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 60000,
});
 
export const recomendarOutfit = (usuario_id, descripcion) =>
  api.post("/ia/recomendar", { usuario_id, descripcion });
 
export const listarPrendas = () => api.get("/catalogo/prendas");
 
export default api;
 