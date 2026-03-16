"use client";
import { SparklesIcon } from '@heroicons/react/24/outline';

export default function StatsStrip() {
  const stats = [
    { label: 'AI‑generated itineraries', value: '3 sec avg' },
    { label: 'Saved plans', value: '12 k+' },
    { label: 'Postcards created', value: '8 k+' }
  ];

  return (
    <section className="flex justify-center gap-8 bg-muted py-4 rounded-lg">
      {stats.map((s, i) => (
        <div key={i} className="text-center">
          <SparklesIcon className="w-6 h-6 mx-auto text-primary" />
          <p className="font-medium text-foreground">{s.value}</p>
          <p className="text-sm text-muted">{s.label}</p>
        </div>
      ))}
    </section>
  );
}
