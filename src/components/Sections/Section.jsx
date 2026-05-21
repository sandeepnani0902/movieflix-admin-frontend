const Section = ({ title, children }) => {
  return (
    <div className="bg-card p-5 rounded-2xl shadow-md">
      <h2 className="text-white text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default Section;
