const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default FullPageLoader;
