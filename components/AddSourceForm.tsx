import { useState } from 'react';

export default function AddSourceForm() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/sources/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, type, publishedAt, url }),
    });

    if (response.ok) {
      alert('Source added successfully!');
      setTitle('');
      setType('');
      setPublishedAt('');
      setUrl('');
    } else {
      alert('Failed to add source.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Published At"
        value={publishedAt}
        onChange={(e) => setPublishedAt(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit">Add Source</button>
    </form>
  );
}
