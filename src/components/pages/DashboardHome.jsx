import React, { useEffect, useState } from "react";
import GenreChart from "../Charts/GenreChart";
import StatCard from "../StartCard";
import Table from "../Tables/Table";

function DashboardHome() {
  const [language, setLanguageList] = useState([]);
  const [genre, setGenreList] = useState([]);
  const [movies, setMovies] = useState([]);
  const [webSeries, setWebSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = {
    Languages: language,
    Genres: genre,
    Movies: movies,
    WebSeries: webSeries,
  };
  const movieColumns = ["Title", "Date", "Status"];

const movieData = [
  { title: "Inception", date: "Apr 20", status: "Published" },
  { title: "Avatar", date: "Apr 18", status: "Pending" },
  { title: "Interstellar", date: "Apr 15", status: "Published" },
  { title: "Batman", date: "Apr 10", status: "Published" },
  { title: "Joker", date: "Apr 08", status: "Pending" },
  { title: "Tenet", date: "Apr 05", status: "Published" },
];

const webSeriesData = [
  { title: "Breaking Bad", date: "Apr 12", status: "Published" },
  { title: "Dark", date: "Apr 10", status: "Published" },
  { title: "Money Heist", date: "Apr 08", status: "Pending" },
  { title: "Stranger Things", date: "Apr 06", status: "Published" },
  { title: "Loki", date: "Apr 03", status: "Published" },
];


  useEffect(() => {
    Promise.all([
      fetchLanguage(),
      fetchGenres(),
      fetchMovies(),
      fetchWebseries(),
    ]).finally(() => setLoading(false));
  }, []);

  // 🔹 API Calls
  const fetchLanguage = async () => {
    try {
      const res = await fetch("http://localhost:2025/movieflix/languages");
      const data = await res.json();
      setLanguageList(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await fetch("http://localhost:2025/movieflix/genre");
      const data = await res.json();
      setGenreList(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMovies = async () => {
    try {
      const res = await fetch("http://localhost:2025/movieflix/movies");
      const data = await res.json();
      setMovies(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWebseries = async () => {
    try {
      const res = await fetch("http://localhost:2025/movieflix/webseries");
      const data = await res.json();
      setWebSeries(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Convert API data → chart format
  const genreData = genre.map((g) => ({
    name: g.name,
    movies: g.movieCount || 0, // make sure backend sends this
  }));

  return (
    <div className="h-full overflow-y-auto bg-slate-900 text-white p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* 🔥 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {Object.keys(categories).map((key) => (
          <StatCard
            key={key}
            title={key}
            value={loading ? "..." : categories[key].length}
            change={Math.floor(Math.random() * 20)}
          />
        ))}
      </div>

      {/* 🔥 Chart */}
      {/* <div className="bg-slate-800 p-5 rounded-2xl mb-6 shadow-lg">
        <h3 className="mb-4 text-lg">Genre Analytics</h3>
        <GenreChart data={genreData} />
      </div> */}

      {/* 🔥 Table */}
      {/* <div className="bg-slate-800 p-5 rounded-2xl shadow-lg">
        <h3 className="mb-4 text-lg">Recent Movies</h3>

        <table className="w-full text-left text-sm">
          <thead className="text-gray-400">
            <tr>
              <th className="py-2">Title</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {movies.slice(0, 5).map((movie, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="py-2">{movie.title}</td>
                <td>{new Date(movie.createdAt).toDateString()}</td>
                <td className="text-green-400">Published</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      import Table from "../components/Table";

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
  
  <Table 
    title="Recent Movies"
    columns={movieColumns}
    data={movieData}
  />

  <Table 
    title="Web Series"
    columns={movieColumns}
    data={webSeriesData}
  />

</div>

    </div>
  );
}

export default DashboardHome;
