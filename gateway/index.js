const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

// Rutas hacia cada microservicio
app.use(
  "/api/ia",
  createProxyMiddleware({
    target: process.env.IA_URL || "http://ia:8001",
    changeOrigin: true,
    pathRewrite: { "^/api/ia": "" },
  }),
);

app.use(
  "/api/catalogo",
  createProxyMiddleware({
    target: process.env.CATALOGO_URL || "http://catalogo:8002",
    changeOrigin: true,
    pathRewrite: { "^/api/catalogo": "" },
  }),
);

app.use(
  "/api/preferencias",
  createProxyMiddleware({
    target: process.env.PREFERENCIAS_URL || "http://preferencias:8003",
    changeOrigin: true,
    pathRewrite: { "^/api/preferencias": "" },
  }),
);

app.use(
  "/api/notificaciones",
  createProxyMiddleware({
    target: process.env.NOTIFICACIONES_URL || "http://notificaciones:8004",
    changeOrigin: true,
    pathRewrite: { "^/api/notificaciones": "" },
  }),
);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Gateway funcionando" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gateway corriendo en puerto ${PORT}`);
});
