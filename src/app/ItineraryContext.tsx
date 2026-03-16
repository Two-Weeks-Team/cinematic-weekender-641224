// Context for global itinerary state (client component)
"use client";

import { createContext } from "react";

export const ItineraryContext = createContext<{ itinerary: any; setItinerary: (i: any) => void } | null>(null);
