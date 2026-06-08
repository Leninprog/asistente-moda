export default function Cargando() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          border: "4px solid #e0e0e0",
          borderTop: "4px solid #1a1a2e",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p style={{ color: "#888" }}>Generando tu outfit...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
