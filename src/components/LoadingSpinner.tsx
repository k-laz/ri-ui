const LoadingSpinner = () => {
  return (
    <div className="flex h-1/3 items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
