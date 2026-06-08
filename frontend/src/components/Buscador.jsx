import { useState } from "react";

export default function Buscador({ onBuscar, cargando }) {
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = () => {
    if (descripcion.trim()) onBuscar(descripcion);
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "32px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        maxWidth: "680px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ marginBottom: "8px", fontSize: "20px" }}>
        ¿Qué estilo buscas hoy?
      </h2>
      <p style={{ color: "#888", marginBottom: "20px", fontSize: "14px" }}>
        Descríbelo con tus palabras — ocasión, colores, estilo, temporada...
      </p>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Ej: algo casual para salir un sábado, me gustan los colores tierra y el estilo oversized"
        rows={4}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "10px",
          border: "1px solid #e0e0e0",
          fontSize: "15px",
          resize: "none",
          outline: "none",
          fontFamily: "inherit",
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={cargando || !descripcion.trim()}
        style={{
          marginTop: "16px",
          width: "100%",
          padding: "14px",
          background: cargando || !descripcion.trim() ? "#ccc" : "#1a1a2e",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "16px",
          cursor: cargando || !descripcion.trim() ? "not-allowed" : "pointer",
          fontWeight: "600",
          transition: "background 0.2s",
        }}
      >
        {cargando ? "Generando..." : "Recomendar outfit"}
      </button>
    </div>
  );
}
