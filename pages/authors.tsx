import { useEffect, useState } from 'react';
import { Author } from '../types';

export default function Authors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch('/api/authors');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Author[] = await response.json();
        console.log('Fetched authors:', data); // Debug log

        setAuthors(data);
      } catch (error) {
        console.error('Error fetching authors:', error);
        setError('Failed to load authors.');
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Authors</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="mt-2 space-y-2">
        {authors.length > 0 ? (
          authors.map((author) => (
            <li key={author.id} className="p-2 border rounded">
              {author.name}
            </li>
          ))
        ) : (
          <p>No sources found.</p>
        )}
      </ul>
    </div>
  );
}
