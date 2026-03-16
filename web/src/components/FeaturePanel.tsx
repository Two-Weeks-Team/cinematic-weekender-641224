"use client";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/outline';

const testimonials = [
  { name: 'Lena', quote: 'My Paris weekend postcard got 1.2k likes instantly! 🎉' },
  { name: 'Marco', quote: 'Saved me hours – the backup plan for rain was perfect.' },
  { name: 'Aisha', quote: 'Loved the vintage look, feels like a real travel stamp.' }
];

export default function FeaturePanel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section className="py-8 text-center">
      <h2 className="text-2xl font-semibold text-primary mb-4">What travelers love</h2>
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto bg-card p-6 rounded-lg shadow"
      >
        <StarIcon className="w-6 h-6 text-accent mx-auto mb-2" />
        <p className="italic text-foreground">“{current.quote}”</p>
        <p className="mt-2 font-medium text-primary">— {current.name}</p>
      </motion.div>
    </section>
  );
}
