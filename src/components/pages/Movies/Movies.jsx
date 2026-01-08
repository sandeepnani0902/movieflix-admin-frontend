import React, { useEffect, useState } from "react";
import "../../pagescss/movie.css";
import { Movieform } from "./Movieform";

function Movies() {
  const [Moviesdata, setMoviesdata] = useState([]);

  // ✔ Reusable Fetch Function
  function fetchMovies() {
    fetch("http://localhost:2025/movieflix/movies")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMoviesdata(data.data);
        } else {
          alert("Failed to fetch movies data");
        }
      })
      .catch(err => console.log("Error fetching movies:", err));
  }

  // ✔ Fetch Only Once on Component Mount
  useEffect(() => {
    fetchMovies();
  }, []);

  // Play Movie
  function playmovie(videourl) {
    window.open(videourl, "_blank");
  }

  // ✔ Delete Movie + Refresh
  function DeleteMovie(id) {
    fetch(`http://localhost:2025/movieflix/movies/deletemovie/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Movie deleted successfully");
          fetchMovies(); // Refresh ONLY after delete
        } else {
          alert("Failed to delete movie");
        }
      })
      .catch(err => console.error("Error deleting movie:", err));
  }

  return (
    <div className="movies">
      <div className="title">
        <h3>Movie Management</h3>
      </div>

      <div className="filter-movie bg-dark">
        <h5>Filter Movie</h5>

        <div className="row">
          <div className="col-4 col-lg-4 col-md-6 col-sm-12">
            <div className="languages fitlering-fields">
              <label>Language:</label>
              <input type="text" readOnly placeholder="All language" />
            </div>
          </div>

          <div className="col-4 col-lg-4 col-md-6 col-sm-12">
            <div className="genre fitlering-fields">
              <label>Genre:</label>
              <input type="text" readOnly placeholder="All Genre" />
            </div>
          </div>

          <div className="col-4 col-lg-4 col-md-6 col-sm-12">
            <div className="filter-btn">
              <button
                className="btn btn-primary"
                onClick={fetchMovies} // ✔ Manual Refresh
              >
                Clear Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">

          <div className="col-12 col-lg-4 col-md-12 col-sm-12">
            <Movieform fetchMovies={fetchMovies} />
          </div>

          <div className="col-12 col-lg-8 col-md-12 col-sm-12">
            <div className="movie-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Director</th>
                    <th>Releasedate</th>
                    <th>Language</th>
                    <th>Genre</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {Moviesdata?.map((movie) => (
                    <tr key={movie._id}>
                      <td>{movie.title}</td>
                      <td>{movie.director}</td>
                      <td>{movie.date}</td>
                      <td>{movie.language}</td>
                      <td>{movie.genre}</td>

                      <td className="d-flex gap-1 flex-direction-column">
                        <button
                          className="btn btn-primary"
                          onClick={() => playmovie(movie.videourl)}
                        >
                           <i className='bi bi-play'></i>
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={() => DeleteMovie(movie._id)}
                        >
                           <i className='bi bi-trash'></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Movies;
