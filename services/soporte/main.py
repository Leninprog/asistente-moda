from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import redis
import os
import threading

app = FastAPI(title="Servicio de Soporte (Preferencias + Notificaciones)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379")
r = redis.from_url(REDIS_URL)

# ─── Router: Preferencias ───────────────────────────────
preferencias_router = APIRouter(prefix="/preferencias", tags=["preferencias"])


@preferencias_router.get("/health")
def health_preferencias():
    return {"status": "ok", "servicio": "preferencias"}


@preferencias_router.get("/{usuario_id}")
def obtener_preferencias(usuario_id: str):
    # Aquí iría la consulta real a la base de datos (tabla "preferencias")
    return {"usuario_id": usuario_id, "preferencias": []}


# ─── Router: Notificaciones ─────────────────────────────
notificaciones_router = APIRouter(prefix="/notificaciones", tags=["notificaciones"])


@notificaciones_router.get("/health")
def health_notificaciones():
    return {"status": "ok", "servicio": "notificaciones"}


def escuchar_eventos():
    """Se suscribe al canal 'recomendaciones' y queda escuchando indefinidamente."""
    pubsub = r.pubsub()
    pubsub.subscribe("recomendaciones")
    print("Notificaciones: escuchando canal 'recomendaciones'...")
    for mensaje in pubsub.listen():
        if mensaje["type"] == "message":
            print(f"Notificación recibida: {mensaje['data']}")
            # Aquí iría la lógica real de notificación (WebSocket, email, etc.)


@app.on_event("startup")
def startup():
    hilo = threading.Thread(target=escuchar_eventos, daemon=True)
    hilo.start()


# ─── Registro de routers ────────────────────────────────
app.include_router(preferencias_router)
app.include_router(notificaciones_router)


@app.get("/health")
def health():
    return {"status": "ok", "servicio": "soporte (preferencias + notificaciones)"}