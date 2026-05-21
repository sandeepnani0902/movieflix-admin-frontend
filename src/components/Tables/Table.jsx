// import React, { useState, useMemo } from "react";

// const Table = ({ title="", columns, data=[] }) => {
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;

//   // 🔍 Filtered Data
//   const filteredData = useMemo(() => {
//     return data.filter((item) =>
//       columns.some((col) =>
//         String(item[col.toLowerCase()] || "")
//           .toLowerCase()
//           .includes(search.toLowerCase())
//       )
//     );
//   }, [search, data, columns]);

//   // 📄 Pagination Logic
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);

//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   return (
//     <div className="bg-slate-800 p-5 rounded-2xl shadow-lg w-full">

//       {/* 🔥 Top Bar (Pagination + Search) */}
//       <div className="flex justify-between items-center mb-3">
        
//         {/* Pagination Left */}
//         <div className="flex items-center gap-2 text-gray-300">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((p) => p - 1)}
//           >
//             {"<"}
//           </button>

//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-2 ${
//                 currentPage === i + 1 ? "text-white font-bold" : ""
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((p) => p + 1)}
//           >
//             {">"}
//           </button>
//         </div>

//         {/* Search Right */}
//         <input
//           type="text"
//           placeholder="Search..."
//           className="bg-slate-700 text-white px-3 py-1 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1); // reset page on search
//           }}
//         />
//       </div>

//       {/* Title */}
//       <h2 className="text-white text-lg font-semibold mb-3">
//         {title}
//       </h2>

//       {/* Table */}
//       <table className="w-full text-sm text-left text-gray-300">
//         <thead className="bg-slate-700 text-gray-200">
//           <tr>
//             {columns.map((col, index) => (
//               <th key={index} className="px-4 py-2">
//                 {col}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           {paginatedData.length > 0 ? (
//             paginatedData.map((item, index) => (
//               <tr key={index} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
//                 {columns.map((col, i) => (
//                   <td key={i} className="px-4 py-2">
//                     {item[col.toLowerCase()]}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={columns.length} className="text-center py-4">
//                 No Data Available
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;
import React, { useState, useMemo } from "react";

const Table = ({
  title = "",
  columns = [],
  data = [],
  enablePagination = true,
  rowsPerPage = 5,
  enableSearch = true,
  currentPage=1,
  setCurrentPage = ()=>{}
}) => {
  const [search, setSearch] = useState("");
  console.log("columns", columns)
  // 🔍 Search (basic: stringify row)
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      JSON.stringify(row).toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  // 📄 Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = enablePagination
    ? filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      )
    : filteredData;

  return (
    <div className="bg-slate-800 p-5 overflow-x-auto rounded-2xl shadow-lg w-full">

      {/* 🔥 Top Bar */}
      <div className="flex justify-between items-center mb-3">

        {/* Pagination */}
        {enablePagination && (
          <div className="flex gap-2 text-gray-300">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              {"<"}
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-2 ${
                  currentPage === i + 1 ? "text-white font-bold" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              {">"}
            </button>
          </div>
        )}

        {/* Search */}
        {enableSearch && (
          <input
            type="text"
            placeholder="Search..."
            className="bg-slate-700 px-3 py-1 rounded-lg text-white"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        )}
      </div>

      {/* Title */}
      {title && (
        <h2 className="text-white text-lg font-semibold mb-3">
          {title}
        </h2>
      )}

      {/* Table */}
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="bg-slate-700 text-gray-200">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-2">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
  {paginatedData.length > 0 ? (
    paginatedData.map((row, rowIndex) => (
      <tr key={rowIndex} className="border-b border-slate-700">

        {columns.map((col, colIndex) => (
          <td key={colIndex} className="px-4 py-2">
            
            {
              typeof col === "string"
                ? row[col.toLowerCase()]   // ✅ for string columns
                : typeof col.render === "function"
                  ? col.render(row, rowIndex)    // ✅ for custom render
                  : row[col.key]          // ✅ fallback (optional)
            }

          </td>
        ))}

      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={columns.length} className="text-center py-4">
        No Data Available
      </td>
    </tr>
  )}
</tbody>

        {/* <tbody>
          {paginatedData.length > 0  & data.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-slate-700 hover:bg-slate-700/50"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-4 py-2">
                    {col.render(row, rowIndex)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No Data Available
              </td>
            </tr>
          )}
        </tbody> */}
      </table>
    </div>
  );
};

export default Table;

