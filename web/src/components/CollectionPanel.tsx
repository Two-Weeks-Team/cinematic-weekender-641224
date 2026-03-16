"use client";
import { useState } from "react";
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const savedItineraries = [
  { id: 1, title: 'Paris Sunset Escape', days: 3 },
  { id: 2, title: 'Alpine Adventure', days: 2 },
  { id: 3, title: 'Coastal Chill', days: 4 }
];

export default function CollectionPanel() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-8">
      <h2 className="text-xl font-semibold text-primary flex items-center gap-2 mb-4">
        <ArchiveBoxIcon className="w-5 h-5" /> Saved itineraries
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {savedItineraries.map(it => (
          <motion.button
            key={it.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelected(it.id)}
            className={`p-4 bg-card rounded-lg shadow ${selected === it.id ? 'border-2 border-primary' : ''}`}
          >
            <p className="font-medium text-foreground">{it.title}</p>
            <p className="text-sm text-muted">{it.days} days</p>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
