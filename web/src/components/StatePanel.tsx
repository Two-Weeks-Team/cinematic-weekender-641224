"use client";
import { useContext } from 'react';
import { ItineraryContext } from '@/app/ItineraryContext';

export default function StatePanel() {
  const ctx = useContext(ItineraryContext);
  const itinerary = ctx?.itinerary;

  if (!itinerary) {
    return null; // No explicit state needed when demo data is shown
  }

  // Placeholder for real loading/error handling – currently always success
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm z-50">
      <div className="bg-card p-6 rounded-lg shadow-lg">
        <p className="text-primary font-medium">Your cinematic weekend is ready!</p>
      </div>
    </div>
  );
}
