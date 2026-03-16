export async function fetchPlan(query: string, preferences: any = {}) {
  const response = await fetch('/api/plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, preferences })
  });
  if (!response.ok) {
    throw new Error('Failed to fetch itinerary');
  }
  return response.json();
}

export async function fetchInsights(selection: any, context: any = {}) {
  const response = await fetch('/api/insights', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ selection, context })
  });
  if (!response.ok) {
    throw new Error('Failed to fetch insights');
  }
  return response.json();
}
