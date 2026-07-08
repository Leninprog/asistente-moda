from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types
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

client = genai.Client(api_key=GEMINI_API_KEY)
r = redis.from_url(REDIS_URL)


class SolicitudOutfit(BaseModel):
    usuario_id: str
    descripcion: str


@app.get("/health")
def health():
    return {"status": "ok", "servicio": "ia"}


@app.post("/recomendar")
async def recomendar_outfit(solicitud: SolicitudOutfit):
    cache_key = f"outfit:{solicitud.usuario_id}:{solicitud.descripcion}"
    cached = r.get(cache_key)
    if cached:
        return json.loads(cached)

    prompt = f"""
    Eres un asistente experto en moda. El usuario describe su estilo así:
    "{solicitud.descripcion}"

    Responde ÚNICAMENTE con un JSON válido con esta estructura exacta, sin texto adicional ni backticks:
    {{
        "ocasion": "descripción breve de la ocasión",
        "prendas": [
            {{
                "tipo": "tipo de prenda",
                "descripcion": "descripción detallada",
                "color": "color principal",
                "busqueda": "terminos de busqueda para tienda"
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
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.7,
                max_output_tokens=4096,
                response_mime_type="application/json",
                thinking_config=types.ThinkingConfig(thinking_budget=0),
            )
        )

        texto = response.text.strip()

        if "```" in texto:
            partes = texto.split("```")
            for parte in partes:
                if parte.startswith("json"):
                    texto = parte[4:].strip()
                    break
                elif parte.strip().startswith("{"):
                    texto = parte.strip()
                    break

        resultado = json.loads(texto)

        r.setex(cache_key, 3600, json.dumps(resultado))
        r.publish("recomendaciones", json.dumps({
            "usuario_id": solicitud.usuario_id,
            "outfit": resultado
        }))

        return resultado

    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Error parseando respuesta de IA: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generando outfit: {str(e)}")