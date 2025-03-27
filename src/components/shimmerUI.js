const ShimmerUI = () => {
  return (
    <div className="p-4">
      {/* Search Bar Skeleton */}
      <div className="w-full h-10 bg-gray-200 animate-pulse rounded-md mb-4"></div>

      {/* Filters Skeleton */}
      <div className="flex gap-4 mb-6">
        {Array(5)
          .fill("")
          .map((_, index) => (
            <div key={index} className="w-24 h-8 bg-gray-200 animate-pulse rounded-md"></div>
          ))}
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(15)
          .fill("")
          .map((_, index) => (
            <div key={index} className="w-full h-90 bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
      </div>
    </div>
  );
};

export default ShimmerUI;
