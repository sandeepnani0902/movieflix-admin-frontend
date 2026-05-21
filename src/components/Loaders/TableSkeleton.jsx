const TableSkeleton = ({ rows = 5, cols = 3 }) => {
  return (
    <div className="bg-slate-800 p-5 rounded-2xl">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4 mb-3 animate-pulse">
          {[...Array(cols)].map((_, j) => (
            <div
              key={j}
              className="h-4 bg-slate-700 rounded w-full"
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
