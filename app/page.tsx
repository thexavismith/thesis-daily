"use client"
import { useState, useEffect } from 'react';
import { Quote } from '../types';

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null);

  const fetchRandomQuote = async () => {
    const response = await fetch('/api/quotes/random');
    const data: Quote = await response.json();
    setQuote(data);
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <>
      {quote && (
        <div>
          <p>{quote.text}</p>
          <p>- {quote.author.name}</p>
          {quote.source && (
            <p>
              Source: {quote.source.title} ({quote.source.type})
            </p>
          )}
        </div>
      )}
      <button onClick={fetchRandomQuote}>Get Random Quote</button>
    </>
  );
}
