export default function OutfitCard({ outfit }) {
  if (!outfit) return null;

  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "32px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        maxWidth: "680px",
        margin: "24px auto 0",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ fontSize: "18px" }}>Tu outfit recomendado</h3>
        <span
          style={{
            background: "#f0f0f0",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "13px",
            color: "#666",
          }}
        >
          {outfit.ocasion}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {outfit.prendas?.map((prenda, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "14px",
              background: "#f9f9f9",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                background: "#1a1a2e",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "18px",
                flexShrink: 0,
              }}
            >
              👕
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "14px",
                  textTransform: "capitalize",
                }}
              >
                {prenda.tipo}
              </p>
              <p style={{ color: "#666", fontSize: "13px" }}>
                {prenda.descripcion}
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              href=
              {outfit.links?.zara?.replace(
                "TERMINO",
                encodeURIComponent(prenda.busqueda),
              )}
              target="_blank" rel="noreferrer" style=
              {{
                padding: "6px 12px",
                background: "#1a1a2e",
                color: "white",
                borderRadius: "6px",
                fontSize: "12px",
                textDecoration: "none",
              }}
              <a>Zara</a>
              href=
              {outfit.links?.hm?.replace(
                "TERMINO",
                encodeURIComponent(prenda.busqueda),
              )}
              target="_blank" rel="noreferrer" style=
              {{
                padding: "6px 12px",
                background: "#e0e0e0",
                color: "#1a1a2e",
                borderRadius: "6px",
                fontSize: "12px",
                textDecoration: "none",
              }}
              <a>H&M</a>
            </div>
          </div>
        ))}
      </div>

      {outfit.justificacion && (
        <p
          style={{
            marginTop: "20px",
            padding: "14px",
            background: "#f0f4ff",
            borderRadius: "10px",
            fontSize: "14px",
            color: "#444",
            lineHeight: "1.5",
          }}
        >
          💡 {outfit.justificacion}
        </p>
      )}
    </div>
  );
}
