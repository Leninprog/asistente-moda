from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Servicio de Preferencias")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/health")
def health():
    return {"status": "ok", "servicio": "preferencias"}

@app.get("/preferencias/{usuario_id}")
def obtener_preferencias(usuario_id: str):
    return {"usuario_id": usuario_id, "preferencias": []}