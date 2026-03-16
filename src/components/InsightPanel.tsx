// src/components/InsightPanel.tsx
"use client";
import { useContext } from 'react';
import { ItineraryContext } from '../app/ItineraryContext';
import { motion } from 'framer-motion';
import { CalendarIcon, CloudIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export default function InsightPanel() {
  const ctx = useContext(ItineraryContext);
  const itinerary = ctx?.itinerary;

  if (!itinerary) {
    // Show seeded demo data when no real itinerary yet
    const demo = {
      days: [
        { title: 'Day 1 – Old Town stroll → Sunset at Seaside Pier', stops: ['St. George\'s Cathedral', 'Harbor Lighthouse'], weather: 'sunny', budget: 30 },
        { title: 'Day 2 – Mountain hike → Night market dinner', stops: ['Summit Trail', 'Night Bazaar'], weather: 'cloudy', budget: 45 },
        { title: 'Day 3 – Island ferry + Beach brunch', stops: ['Ferry Dock', 'Sunset Beach'], weather: 'rain', budget: 35 }
      ]
    };
    return <DemoCarousel data={demo} />;
  }

  return <DemoCarousel data={itinerary} />;
}

function DemoCarousel({ data }: { data: { days: any[] } }) {
  return (
    <section className="max-w-4xl mx-auto overflow-hidden">
      <div className="flex gap-6 overflow-x-auto scrollbar-hide py-4 snap-x snap-mandatory">
        {data.days.map((day, idx) => (
          <motion.div
            key={idx}
            className="snap-start min-w-[280px] bg-card rounded-lg shadow-md p-4 flex flex-col gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="font-semibold text-primary flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />{day.title}
            </h3>
            <ul className="list-disc list-inside text-sm text-foreground">
              {day.stops.map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-xs mt-auto">
              <CloudIcon className="w-4 h-4" /> {day.weather}
              <CurrencyDollarIcon className="w-4 h-4" /> ≈ ${day.budget}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
