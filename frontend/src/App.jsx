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
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "800",
              marginBottom: "12px",
            }}
          >
            👗 Asistente de Moda
          </h1>

          <p
            style={{
              fontSize: "18px",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Describe tu estilo, ocasión o preferencias y recibe una propuesta de
            outfit personalizada.
          </p>
        </div>

        <Buscador onBuscar={handleBuscar} cargando={cargando} />

        {cargando && <Cargando />}

        {error && (
          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              background: "#fff1f2",
              border: "1px solid #fecdd3",
              borderRadius: "12px",
              color: "#be123c",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {outfit && <OutfitCard outfit={outfit} />}
      </div>
    </div>
  );
}
