import { useEffect, useState } from 'react';
import { Source } from '../types';

export default function Sources() {
  const [sources, setSources] = useState<Source[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await fetch('/api/sources');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Source[] = await response.json();
        console.log('Fetched sources:', data); // Debug log

        setSources(data);
      } catch (error) {
        console.error('Error fetching sources:', error);
        setError('Failed to load sources.');
      }
    };

    fetchSources();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Sources</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="mt-2 space-y-2">
        {sources.length > 0 ? (
          sources.map((source) => (
            <li key={source.id} className="p-2 border rounded">
              {source.title}
            </li>
          ))
        ) : (
          <p>No sources found.</p>
        )}
      </ul>
    </div>
  );
}
