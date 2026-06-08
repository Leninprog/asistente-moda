from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import redis
import os
import threading

app = FastAPI(title="Servicio de Notificaciones")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379")
r = redis.from_url(REDIS_URL)

def escuchar_eventos():
    pubsub = r.pubsub()
    pubsub.subscribe("recomendaciones")
    print("Notificaciones: escuchando canal 'recomendaciones'...")
    for mensaje in pubsub.listen():
        if mensaje["type"] == "message":
            print(f"Notificación recibida: {mensaje['data']}")

@app.on_event("startup")
def startup():
    hilo = threading.Thread(target=escuchar_eventos, daemon=True)
    hilo.start()

@app.get("/health")
def health():
    return {"status": "ok", "servicio": "notificaciones"}