import React, { useEffect, useState } from "react";
import Table from "../../Tables/Table";
import ButtonLoader from "../../Loaders/ButtonLoader";
import TableSkeleton from "../../Loaders/TableSkeleton";
import { Movieform } from "./Movieform";
import MediaViewer from "../../MediaViewers/MediaViewer";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState(null);
  const [currentPage, setCurrentPage] = useState(1)
  const [addmovie, setAddmovie] = useState(false);

  // 🔹 Fetch Movies
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://movie-flix-product-backend.onrender.com/movieflix/movies");
      const data = await res.json();

      if (data.success) {
        setMovies(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // 🔹 Play
  const playmovie = (url) => {
    window.open(url, "_blank");

  };

  // 🔹 Delete
  const deleteMovie = async (id) => {
    if (!window.confirm("Delete this movie?")) return;

    try {
      const res = await fetch(
        `https://movie-flix-product-backend.onrender.com/movieflix/movies/deletemovie/${id}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (data.success) {
        fetchMovies();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Columns (render-based)
  const columns = [
    {
      title: "S.No",
      render: (row, index) => <span>{index + 1}</span>,
    },
    {
      title: "Title",
      render: (row) => <span>{row.title}</span>,
    },
    {
      title: "Director",
      render: (row) => <span>{row.director}</span>,
    },
    {
      title: "Release",
      render: (row) => <span>{row.date}</span>,
    },
    {
      title: "Language",
      render: (row) => (
        <span className="text-blue-400">{row.language}</span>
      ),
    },
    {
      title: "Genre",
      render: (row) => (
        <span className="text-purple-400">{row.genre}</span>
      ),
    },
    {
      title: "Action",
      render: (row) => (
        <div className="flex gap-3">
          <button
            onClick={() =>
              setMedia({
                url: row.videourl,
                type: "video",
                title: row.title,
              })
            }
            className="text-green-400 hover:text-green-500"
          >
            ▶
          </button>

          <button
            onClick={() => deleteMovie(row._id)}
            className="text-red-400 hover:text-red-500"
          >
            🗑
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">
        Movie Management
      </h1>

      {/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-6"> */}
      <div className="flex justify-center align-center">

        {addmovie ? (<div className="w-[50%]">
          <Movieform fetchMovies={fetchMovies} setAddmovie={setAddmovie} />
        </div>) : (
          <div className="w-full">
            <div className="flex justify-end">
              <button onClick={() => setAddmovie(true)} className="bg-blue-500 text-white px-4 py-2 mb-2 rounded">Add movie</button>
            </div>
            {loading ? (
              <TableSkeleton rows={6} cols={6} />
            ) : (
              <Table
                title={`Movies (${movies.length})`}
                columns={columns}
                data={movies}
                enablePagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        )}
      </div>

      {media && (
        <MediaViewer
          media={media}
          onClose={() => setMedia(null)}
        />
      )}

    </div>
  );
}

export default Movies;



// import React, { useEffect, useRef, useState } from "react";
// import "../../pagescss/movie.css";
// import { Movieform } from "./Movieform";

// function Movies() {
//   const [Moviesdata, setMoviesdata] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [currentpageData, setCurrentpageData] = useState([]);
//   const [currentpage, setPage] = useState(1);
//   const [language, setLanguage] =useState('')
//   const [genre, setGenre] = useState("")

//   const perpage = 2;
//   const totalpages = Math.ceil(filteredData.length / perpage);

//   const DebounceTimer = useRef();

//   // ✔ Fetch Movies
//   function fetchMovies() {
//     fetch("http://localhost:2025/movieflix/movies")
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           setMoviesdata(data.data);
//           setFilteredData(data.data); // important
//         }
//       })
//       .catch(err => console.log("Error fetching movies:", err));
//   }

//   // ✔ Fetch Once
//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   // ✔ Pagination auto-update
//   useEffect(() => {
//     const start = currentpage * perpage - perpage;
//     const end = start + perpage;
//     setCurrentpageData(filteredData.slice(start, end));
//   }, [filteredData, currentpage]);

//   // ✔ Play Movie
//   function playmovie(videourl) {
//     window.open(videourl, "_blank");
//   }

//   // ✔ Delete Movie
//   function DeleteMovie(id) {
//     fetch(`http://localhost:2025/movieflix/movies/deletemovie/${id}`, {
//       method: "DELETE"
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           fetchMovies();
//         }
//       })
//       .catch(err => console.error("Error deleting movie:", err));
//   }

//   // ✔ Filter Handler
//   function filterSearch(type, e) {
//     let value = e.target.value;

//     switch (type) {
//       case "language":
//         return debounceLang(value, 500);
//       case "genre":
//         return debounceGenre(value, 500);
//       default:
//         return ;
//     }
//   }

//   // ✔ Debounce Language
//   function debounceLang(v, d) {
//     clearTimeout(DebounceTimer.current);

//     DebounceTimer.current = setTimeout(() => {
//       filterLanguage(v);
//     }, d);
//   }

//   // ✔ Language Filter Logic
//   function filterLanguage(v) {
//     let filtered = Moviesdata.filter(m =>
//       m.language.toLowerCase().includes(v.toLowerCase())
//     );

//     setFilteredData(filtered);
//     setPage(1);
//   }

//   // ✔ Debounce Genre (optional logic)
//   function debounceGenre(v, d) {
//     clearTimeout(DebounceTimer.current);

//     DebounceTimer.current = setTimeout(() => {
//       let filtered = Moviesdata.filter(m =>
//         m.genre.toLowerCase().includes(v.toLowerCase())
//       );

//       setFilteredData(filtered);
//       setPage(1);
//     }, d);
//   }
//  function clearfilter(){
//   setFilteredData(Moviesdata)
//   setPage(1)
//   setGenre("")
//   setLanguage("")
//  }
//   return (
//     <div className="movies">
//       <div className="title">
//         <h3>Movie Management</h3>
//       </div>

//       <div className="filter-movie bg-dark">
//         <h5>Filter Movie</h5>

//         <div className="row">
//           <div className="col-4">
//             <label>Language:</label>
//             <input className="input1"
//               type="text"
//               placeholder="All language"
//               onChange={(e) => {
//                 setLanguage(e.target.value)
//                 filterSearch("language", e)}}
//             />
//           </div>

//           <div className="col-4">
//             <label>Genre:</label>
//             <input value={genre}
//               type="text"
//               placeholder="All Genre"
//               onChange={(e) =>{
//                 setGenre(e.target.value)
//                 filterSearch("genre", e)}}
//             />
//           </div>

//           <div className="col-4">
//             <button className="btn btn-primary" onClick={clearfilter}>
//               Clear Filter
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-12 col-lg-3 col-md-12 col-sm-12">
//             <Movieform fetchMovies={fetchMovies} />
//           </div>

//           <div className="col-12 col-lg-9 col-md-12 col-sm-12">
//             <div className="movie-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>Director</th>
//                   <th>Releasedate</th>
//                   <th>Language</th>
//                   <th>Genre</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {currentpageData.map(movie => (
//                   <tr key={movie._id}>
//                     <td>{movie.title}</td>
//                     <td>{movie.director}</td>
//                     <td>{movie.date}</td>
//                     <td>{movie.language}</td>
//                     <td>{movie.genre}</td>
//                     <td>
//                       <button
//                         className="btn btn-primary"
//                         onClick={() => playmovie(movie.videourl)}
//                       >
//                         ▶
//                       </button>

//                       <button
//                         className="btn btn-danger"
//                         onClick={() => DeleteMovie(movie._id)}
//                       >
//                         🗑
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             </div>
//             <div className="pagination">
//               <button
//                 onClick={() => currentpage > 1 && setPage(p => p - 1)}
//                 disabled={currentpage === 1}
//               >
//                 Prev
//               </button>

//               <span>{currentpage}</span>

//               <button
//                 onClick={() =>
//                   currentpage < totalpages && setPage(p => p + 1)
//                 }
//                 disabled={currentpage === totalpages}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Movies;
