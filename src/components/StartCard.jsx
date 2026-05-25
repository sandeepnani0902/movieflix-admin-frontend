import { ArrowUpRight } from "lucide-react";

const StatCard = ({ title, value, change }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-slate-800 p-3 rounded-2xl shadow-md 
                    hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <div className="flex justify-between items-center mb-3">
        <ArrowUpRight size={18} className="text-blue-400" />

        <span className={`text-sm font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}>
          {isPositive ? "+" : ""}
          {change}%
        </span>
      </div>

      <h3 className="text-sm text-gray-400">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};

export default StatCard;
