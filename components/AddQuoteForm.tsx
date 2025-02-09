import { useState } from 'react';

export default function AddQuoteForm({ authors, sources }: { authors: any[]; sources: any[] }) {
  const [text, setText] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [sourceId, setSourceId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/quotes/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, author_id: authorId, source_id: sourceId }),
    });

    if (response.ok) {
      alert('Quote added successfully!');
      setText('');
      setAuthorId('');
      setSourceId('');
    } else {
      alert('Failed to add quote.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Quote text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <select
        value={authorId}
        onChange={(e) => setAuthorId(e.target.value)}
        required
      >
        <option value="">Select an author</option>
        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </select>
      <select
        value={sourceId}
        onChange={(e) => setSourceId(e.target.value)}
      >
        <option value="">Select a source (optional)</option>
        {sources.map((source) => (
          <option key={source.id} value={source.id}>
            {source.title}
          </option>
        ))}
      </select>
      <button type="submit">Add Quote</button>
    </form>
  );
}
