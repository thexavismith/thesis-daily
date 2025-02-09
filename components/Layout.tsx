import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4">
      <nav className="mb-4 space-x-4">
        <Link href="/" className="text-blue-500 hover:underline">Home</Link>
        <Link href="/authors" className="text-blue-500 hover:underline">Authors</Link>
        <Link href="/sources" className="text-blue-500 hover:underline">Sources</Link>
      </nav>
      {children}
    </div>
  );
}
