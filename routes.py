from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from models import SessionLocal, Itinerary
from ai_service import call_inference

router = APIRouter()

# ---------- Pydantic request / response models ----------
class PlanRequest(BaseModel):
    query: str
    preferences: Optional[Dict[str, Any]] = None

class PlanResponse(BaseModel):
    summary: str
    items: List[Dict[str, Any]]
    score: float

class InsightsRequest(BaseModel):
    selection: str
    context: Optional[str] = None

class InsightsResponse(BaseModel):
    insights: List[str]
    next_actions: List[str]
    highlights: List[str]

class ItineraryCreate(BaseModel):
    title: str = Field(default="Untitled")
    data: Dict[str, Any]

class ItineraryRead(BaseModel):
    id: int
    title: str
    created_at: str
    data: Dict[str, Any]

# ---------- AI‑powered endpoints ----------
@router.post("/plan", response_model=PlanResponse)
async def generate_plan(req: PlanRequest):
    system_msg = {
        "role": "system",
        "content": (
            "You are an expert travel itinerary planner. Extract a structured weekend itinerary "
            "from the provided video URL or transcript. Return JSON with keys: summary (string), "
            "items (list of day objects), score (confidence 0‑1)."
        )
    }
    user_msg = {"role": "user", "content": f"Query: {req.query}\nPreferences: {req.preferences or {}}"}
    raw = await call_inference([system_msg, user_msg])
    if isinstance(raw, dict) and {"summary", "items", "score"}.issubset(raw.keys()):
        return PlanResponse(summary=raw["summary"], items=raw["items"], score=raw["score"])
    # Fallback response
    return PlanResponse(summary="Generated itinerary (fallback)", items=[], score=0.0)

@router.post("/insights", response_model=InsightsResponse)
async def get_insights(req: InsightsRequest):
    system_msg = {
        "role": "system",
        "content": (
            "You are a travel insight generator. Based on the selected part of an itinerary and optional "
            "context, provide useful insights, next actions, and highlights. Return JSON with keys: "
            "insights, next_actions, highlights."
        )
    }
    user_msg = {"role": "user", "content": f"Selection: {req.selection}\nContext: {req.context or ''}"}
    raw = await call_inference([system_msg, user_msg])
    if isinstance(raw, dict) and {"insights", "next_actions", "highlights"}.issubset(raw.keys()):
        return InsightsResponse(insights=raw["insights"], next_actions=raw["next_actions"], highlights=raw["highlights"])
    return InsightsResponse(insights=[], next_actions=[], highlights=[])

# ---------- CRUD‑style itinerary endpoints (non‑AI) ----------
@router.get("/itineraries", response_model=List[ItineraryRead])
def list_itineraries():
    with SessionLocal() as session:
        its = session.query(Itinerary).all()
        return [
            ItineraryRead(
                id=it.id,
                title=it.title,
                created_at=it.created_at.isoformat(),
                data=it.data,
            )
            for it in its
        ]

@router.post("/itineraries", response_model=ItineraryRead)
def create_itinerary(payload: ItineraryCreate):
    with SessionLocal() as session:
        new_it = Itinerary(title=payload.title, data=payload.data)
        session.add(new_it)
        session.commit()
        session.refresh(new_it)
        return ItineraryRead(
            id=new_it.id,
            title=new_it.title,
            created_at=new_it.created_at.isoformat(),
            data=new_it.data,
        )
