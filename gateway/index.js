const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();

const origenesPermitidos = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",")
  : ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: origenesPermitidos,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Rutas hacia cada microservicio
app.use('/api/ia', createProxyMiddleware({
  target: process.env.IA_URL || 'http://ia:8001',
  changeOrigin: true,
  pathRewrite: { '^/api/ia': '' },
  proxyTimeout: 60000,
  timeout: 60000
}))

app.use(
  "/api/preferencias",
  createProxyMiddleware({
    target: process.env.SOPORTE_URL || "http://soporte:8003",
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
  }),
);

app.use(
  "/api/notificaciones",
  createProxyMiddleware({
    target: process.env.SOPORTE_URL || "http://soporte:8003",
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
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