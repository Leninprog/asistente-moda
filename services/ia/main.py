from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import redis
import os
import json

app = FastAPI(title="Servicio de IA")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")
r = redis.from_url(REDIS_URL)

class SolicitudOutfit(BaseModel):
    usuario_id: str
    descripcion: str

@app.get("/health")
def health():
    return {"status": "ok", "servicio": "ia"}

@app.post("/recomendar")
async def recomendar_outfit(solicitud: SolicitudOutfit):
    # Revisar caché primero
    cache_key = f"outfit:{solicitud.usuario_id}:{solicitud.descripcion}"
    cached = r.get(cache_key)
    if cached:
        return json.loads(cached)

    prompt = f"""
    Eres un asistente experto en moda. El usuario describe su estilo así:
    "{solicitud.descripcion}"

    Responde ÚNICAMENTE con un JSON válido con esta estructura exacta, sin texto adicional:
    {{
        "ocasion": "descripción breve de la ocasión",
        "prendas": [
            {{
                "tipo": "tipo de prenda",
                "descripcion": "descripción detallada",
                "color": "color principal",
                "busqueda": "términos de búsqueda para tienda"
            }}
        ],
        "justificacion": "por qué este outfit combina bien",
        "links": {{
            "zara": "https://www.zara.com/ec/es/search?searchTerm=TERMINO",
            "hm": "https://www2.hm.com/es_es/search-results.html?q=TERMINO"
        }}
    }}
    """

    try:
        respuesta = model.generate_content(prompt)
        texto = respuesta.text.strip()

        # Limpiar si Gemini devuelve markdown
        if texto.startswith("```"):
            texto = texto.split("```")[1]
            if texto.startswith("json"):
                texto = texto[4:]

        resultado = json.loads(texto)

        # Guardar en caché por 1 hora
        r.setex(cache_key, 3600, json.dumps(resultado))

        # Publicar evento al Event Bus
        r.publish("recomendaciones", json.dumps({
            "usuario_id": solicitud.usuario_id,
            "outfit": resultado
        }))

        return resultado

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generando outfit: {str(e)}")