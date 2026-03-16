"use client";
import { PhotographIcon } from '@heroicons/react/24/outline';

export default function ReferenceShelf() {
  const samples = [
    {
      title: 'Sample Postcard – Day 1',
      description: 'Seaside pier sunset with golden hue',
      img: 'https://via.placeholder.com/300x200?text=Postcard+Day+1'
    },
    {
      title: 'Sample Postcard – Day 2',
      description: 'Mountain hike under clear skies',
      img: 'https://via.placeholder.com/300x200?text=Postcard+Day+2'
    },
    {
      title: 'Sample Postcard – Day 3',
      description: 'Beach brunch with sunrise',
      img: 'https://via.placeholder.com/300x200?text=Postcard+Day+3'
    }
  ];

  return (
    <section className="py-8">
      <h2 className="text-xl font-semibold text-primary flex items-center gap-2 mb-4">
        <PhotographIcon className="w-5 h-5" /> Postcard preview samples
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {samples.map((s, i) => (
          <div key={i} className="bg-card rounded-lg shadow p-4">
            <img src={s.img} alt={s.title} className="w-full h-40 object-cover rounded" />
            <h3 className="mt-2 font-medium text-foreground">{s.title}</h3>
            <p className="text-sm text-muted">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
