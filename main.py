from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from routes import router
from models import engine, Base, SessionLocal, Itinerary
from datetime import datetime

app = FastAPI()

@app.middleware("http")
async def normalize_api_prefix(request: Request, call_next):
    if request.scope.get("path", "").startswith("/api/"):
        request.scope["path"] = request.scope["path"][4:] or "/"
    return await call_next(request)

app.include_router(router)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/", response_class=HTMLResponse)
def root():
    html = """
    <html>
    <head><title>Cinematic Weekender API</title></head>
    <body style=\"background:#111;color:#eee;font-family:Arial;padding:2rem;\">
      <h1 style=\"color:#ffcc00;\">Cinematic Weekender</h1>
      <p>Turn travel videos into gorgeous weekend postcards.</p>
      <h2>Available Endpoints</h2>
      <ul>
        <li>GET <code>/health</code></li>
        <li>POST <code>/plan</code> – generate itinerary from video URL or transcript</li>
        <li>POST <code>/insights</code> – get insights for selected itinerary parts</li>
        <li>GET <code>/itineraries</code> – list saved itineraries</li>
        <li>POST <code>/itineraries</code> – save a new itinerary</li>
      </ul>
      <p>Tech Stack: FastAPI 0.115.0, PostgreSQL, DigitalOcean Serverless Inference (openai-gpt-oss-120b)</p>
      <p><a href=\"/docs\" style=\"color:#ffcc00;\">OpenAPI Docs</a> | <a href=\"/redoc\" style=\"color:#ffcc00;\">ReDoc</a></p>
    </body>
    </html>
    """
    return html

@app.on_event("startup")
def startup():
    # Ensure tables exist
    Base.metadata.create_all(bind=engine)
    # Seed demo itinerary if DB empty
    with SessionLocal() as session:
        if session.query(Itinerary).count() == 0:
            demo_data = {
                "days": [
                    {"day": 1, "stops": ["Old Town walking tour", "Sunset at Seaside Pier"]},
                    {"day": 2, "stops": ["Mountain hike", "Night market dinner"]},
                    {"day": 3, "stops": ["Island ferry", "Beach brunch"]}
                ],
                "highlights": ["St. George's Cathedral", "Harbor Lighthouse", "Willow Café"],
                "fallbacks": {"rain": "City Art Museum guided tour"},
                "budget": "≈ $45 per person for Day 2"
            }
            demo_itinerary = Itinerary(title="Demo Weekend in Fantasyland", data=demo_data)
            session.add(demo_itinerary)
            session.commit()
