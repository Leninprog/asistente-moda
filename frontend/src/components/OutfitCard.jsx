export default function OutfitCard({ outfit }) {
  if (!outfit) return null;

  return (
    <div
      className="card fade-in"
      style={{
        marginTop: "28px",
        padding: "32px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h3
          style={{
            fontSize: "24px",
            fontWeight: "700",
          }}
        >
          Tu outfit recomendado
        </h3>

        <span
          style={{
            background: "#eef2ff",
            color: "#4338ca",
            padding: "8px 14px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: "600",
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
              gap: "16px",
              alignItems: "flex-start",
              padding: "18px",
              border: "1px solid #e5e7eb",
              borderRadius: "14px",
              background: "#fafafa",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: "#111827",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
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
              <a
                href={`https://www.zara.com/ec/es/search?searchTerm=${encodeURIComponent(
                  prenda.busqueda,
                )}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "8px 14px",
                  background: "#111827",
                  color: "white",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                Zara
              </a>

              <a
                href={`https://www2.hm.com/es_es/search-results.html?q=${encodeURIComponent(
                  prenda.busqueda,
                )}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "8px 14px",
                  background: "#111827",
                  color: "white",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                H&M
              </a>
            </div>
          </div>
        ))}
      </div>

      {outfit.justificacion && (
        <p
          style={{
            marginTop: "24px",
            padding: "18px",
            background: "#f8fafc",
            border: "1px solid #e5e7eb",
            borderRadius: "14px",
            lineHeight: "1.7",
          }}
        >
          💡 {outfit.justificacion}
        </p>
      )}
    </div>
  );
}
