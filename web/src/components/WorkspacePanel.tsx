"use client";
import { useContext, useState } from "react";
import { ItineraryContext } from '@/app/ItineraryContext';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function WorkspacePanel() {
  const ctx = useContext(ItineraryContext);
  const itinerary = ctx?.itinerary;

  // Simple local state for demo sliders
  const [budget, setBudget] = useState(50);
  const [weatherPref, setWeatherPref] = useState('sunny');

  const applyChanges = () => {
    // In a real app we'd send patches to backend; here we just log
    console.log('Applying preferences', { budget, weatherPref });
  };

  return (
    <section className="flex flex-col md:flex-row items-start gap-6 bg-muted rounded-lg p-4">
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-primary flex items-center gap-2 mb-2">
          <AdjustmentsHorizontalIcon className="w-5 h-5" /> Adjust your plan
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="w-24 text-sm">Daily budget</label>
            <input
              type="range"
              min={10}
              max={200}
              value={budget}
              onChange={e => setBudget(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="w-12 text-sm">${budget}</span>
          </div>
          <div className="flex items-center gap-3">
            <label className="w-24 text-sm">Weather pref.</label>
            <select
              value={weatherPref}
              onChange={e => setWeatherPref(e.target.value)}
              className="border border-muted rounded p-1"
            >
              <option value="sunny">Sunny</option>
              <option value="cloudy">Cloudy</option>
              <option value="rain">Rain</option>
            </select>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={applyChanges}
            className="mt-2 px-4 py-2 bg-accent text-card rounded"
          >
            Apply tweaks
          </motion.button>
        </div>
      </div>
      {itinerary && (
        <div className="max-w-xs w-full">
          <h3 className="text-sm font-medium mb-1 text-foreground">Preview (Day 1)</h3>
          <div className="bg-card rounded-md p-2 shadow-inner">
            <p className="text-sm">{itinerary.days[0].title}</p>
            <ul className="list-disc list-inside text-xs mt-1">
              {itinerary.days[0].stops.map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
