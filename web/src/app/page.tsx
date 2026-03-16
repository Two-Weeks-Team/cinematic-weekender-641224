"use client";
import { createContext, useContext, useState } from "react";
import Hero from '@/components/Hero';
import StatsStrip from '@/components/StatsStrip';
import WorkspacePanel from '@/components/WorkspacePanel';
import InsightPanel from '@/components/InsightPanel';
import FeaturePanel from '@/components/FeaturePanel';
import CollectionPanel from '@/components/CollectionPanel';
import ReferenceShelf from '@/components/ReferenceShelf';
import StatePanel from '@/components/StatePanel';

// Simple global store using Context
export const ItineraryContext = createContext<{ itinerary: any; setItinerary: (i: any) => void } | null>(null);

export default function Home() {
  const [itinerary, setItinerary] = useState<any>(null);

  return (
    <ItineraryContext.Provider value={{ itinerary, setItinerary }}>
      <main className="flex flex-col gap-8 max-w-screen-xl mx-auto p-4">
        <Hero />
        <StatsStrip />
        <WorkspacePanel />
        <InsightPanel />
        <FeaturePanel />
        <CollectionPanel />
        <ReferenceShelf />
        <StatePanel />
      </main>
    </ItineraryContext.Provider>
  );
}