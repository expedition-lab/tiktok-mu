export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center text-center p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Page not found</h1>
        <p className="text-white/70 mb-4">The link may be broken or the page was removed.</p>
        <a href="/" className="inline-block rounded-md bg-white text-black px-4 py-2 text-sm font-medium">
          Go home
        </a>
      </div>
    </main>
  );
}
