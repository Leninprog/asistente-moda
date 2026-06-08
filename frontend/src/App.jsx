import { useState } from "react";
import Buscador from "./components/Buscador";
import OutfitCard from "./components/OutfitCard";
import Cargando from "./components/Cargando";
import { recomendarOutfit } from "./api";

export default function App() {
  const [outfit, setOutfit] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const handleBuscar = async (descripcion) => {
    setCargando(true);
    setError(null);
    setOutfit(null);
    try {
      const res = await recomendarOutfit("usuario_1", descripcion);
      setOutfit(res.data);
    } catch (e) {
      setError("Hubo un error generando el outfit. Intenta de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h1
            style={{ fontSize: "32px", fontWeight: "800", marginBottom: "8px" }}
          >
            👗 Asistente de Moda
          </h1>
          <p style={{ color: "#888", fontSize: "16px" }}>
            Describe tu estilo y te recomendamos el outfit perfecto
          </p>
        </div>

        <Buscador onBuscar={handleBuscar} cargando={cargando} />

        {cargando && <Cargando />}

        {error && (
          <p
            style={{
              textAlign: "center",
              color: "#e74c3c",
              marginTop: "20px",
              padding: "14px",
              background: "#ffeaea",
              borderRadius: "10px",
            }}
          >
            {error}
          </p>
        )}

        {outfit && <OutfitCard outfit={outfit} />}
      </div>
    </div>
  );
}
