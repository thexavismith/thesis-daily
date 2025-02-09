import { useState } from 'react';

export default function AddAuthorForm() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    if (image) {
      formData.append('image', image);
    }

    const response = await fetch('/api/authors/create', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Author added successfully!');
      setName('');
      setBio('');
      setImage(null);
    } else {
      alert('Failed to add author.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
          }
        }}
      />
      <button type="submit">Add Author</button>
    </form>
  );
}
