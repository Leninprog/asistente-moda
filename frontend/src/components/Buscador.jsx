import { useState } from "react";

export default function Buscador({ onBuscar, cargando }) {
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = () => {
    if (descripcion.trim()) onBuscar(descripcion);
  };

  return (
    <div
      className="card fade-in"
      style={{
        padding: "32px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          marginBottom: "8px",
        }}
      >
        ¿Qué estilo buscas hoy?
      </h2>

      <p
        style={{
          marginBottom: "20px",
        }}
      >
        Describe ocasión, colores, temporada, estilo o cualquier detalle que
        tengas en mente.
      </p>

      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Ej: Outfit casual para salir el sábado, colores tierra, estilo oversized..."
        rows={5}
        style={{
          padding: "16px",
          fontSize: "15px",
          resize: "none",
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={cargando || !descripcion.trim()}
        style={{
          width: "100%",
          marginTop: "18px",
          padding: "14px",
          borderRadius: "12px",
          background: cargando || !descripcion.trim() ? "#d1d5db" : "#111827",
          color: "white",
          fontWeight: "600",
          fontSize: "15px",
          transition: "0.2s",
        }}
      >
        {cargando ? "Generando outfit..." : "Generar recomendación"}
      </button>
    </div>
  );
}
