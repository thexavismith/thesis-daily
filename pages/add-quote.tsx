import { useEffect, useState } from 'react';
import AddQuoteForm from '../components/AddQuoteForm';

export default function AddQuotePage() {
  const [authors, setAuthors] = useState([]);
  const [sources, setSources] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const authorsResponse = await fetch('/api/authors');
      const authorsData = await authorsResponse.json();
      setAuthors(authorsData);

      const sourcesResponse = await fetch('/api/sources');
      const sourcesData = await sourcesResponse.json();
      setSources(sourcesData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Add Quote</h1>
      <AddQuoteForm authors={authors} sources={sources} />
    </div>
  );
}
