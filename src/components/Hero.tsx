// src/components/Hero.tsx
"use client";
import { useContext, useState } from "react";
import { fetchPlan } from '@/lib/api';
import { ItineraryContext } from '../app/ItineraryContext';
import { Playfair_Display } from 'next/font/google';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';

const titleFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: 'normal'
});

export default function Hero() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ctx = useContext(ItineraryContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPlan(url);
      ctx?.setItinerary(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-16 md:py-24 text-center">
      <h1 className={`${titleFont.className} text-4xl md:text-5xl text-primary mb-4`}>Cinematic Weekender</h1>
      <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">Turn your favorite travel videos into a vintage postcard‑style itinerary in seconds.</p>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="YouTube video URL or transcript"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="flex-1 px-4 py-2 border border-muted rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary text-card rounded-lg hover:bg-primary/90 transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <motion.div
              className="w-5 h-5 border-2 border-card border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
            />
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" /> Create My Postcard
            </>
          )}
        </button>
      </form>
      {error && <p className="mt-4 text-warning">{error}</p>}
    </section>
  );
}
