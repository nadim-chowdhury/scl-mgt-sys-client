export default function LoadingAndErrorMessage({ loading, error }) {
  return (
    <div className="mb-4">
      {loading && <p className="text-center">Loading...</p>}
      {error && (
        <p className="text-center text-red-500">Error: {error.message}</p>
      )}
    </div>
  );
}
