import React, { useEffect, useState } from "react";

export const WebSeriesform = ({
  setShowSeasonPopUp,
  setSeasonsCount,
  setWebseriesId,
  setShowAddSeriesForm,
  setShowWebSerieslist
}) => {
  const [languageslist, setLanguageslist] = useState([]);
  const [genrelist, setGenrelist] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [movie, setMovie] = useState({
    title: "",
    director: "",
    date: "",
    language: "",
    genre: "",
    webseriesImage: null,
    webseriesbanner: null,
    description: "",
    seasons: 0,
  });

  useEffect(() => {
    fetchLanguages();
    fetchGenres();
  }, []);

  const fetchLanguages = () => {
    fetch("https://movie-flix-product-backend.onrender.com/movieflix/languages")
      .then((res) => res.json())
      .then((data) => setLanguageslist(data.data || []));
  };

  const fetchGenres = () => {
    fetch("https://movie-flix-product-backend.onrender.com/movieflix/genre")
      .then((res) => res.json())
      .then((data) => setGenrelist(data.data || []));
  };

  function handleinput(e) {
    const { name, value } = e.target;

    if (name === "seasons" && value <= 0) {
      alert("Seasons must be greater than 0");
      return;
    }

    setMovie((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileInput(e) {
    const { name, files } = e.target;
    setMovie((prev) => ({ ...prev, [name]: files[0] }));
  }

  function handleform(e) {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    setSeasonsCount(parseInt(movie.seasons));

    const formData = new FormData();
    Object.keys(movie).forEach((key) =>
      formData.append(key, movie[key])
    );

    fetch("https://movie-flix-product-backend.onrender.com/movieflix/webseries", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setWebseriesId(data.id.insertedId);
          alert("Web series added successfully");
          setMovie({
            title: "",
            director: "",
            date: "",
            language: "",
            genre: "",
            webseriesImage: null,
            webseriesbanner: null,
            description: "",
            seasons: 0,
          });
          setShowAddSeriesForm(false)
          setShowSeasonPopUp(true);
        }
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <div className="lg:w-[60%] md:w-[70%] sm:w-full flex flex-col justify-center align-center bg-gray-900  p-3 rounded-xl text-white">
      <div className=" flex w-full justify-between">
        <h2 className="text-xl font-semibold mb-3 ">
          Add New Web Series
        </h2>

        <button className="bg-red-600 px-4 py-2 text-base rounded cursor-pointer mb-2 " onClick={() => {
          setShowAddSeriesForm(false)
          setShowWebSerieslist(true);
        }}>
          Close
        </button>
      </div>
      <div className="">
        <form onSubmit={handleform} className="space-y-3">

          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full p-2 bg-gray-800 rounded"
            onChange={handleinput}
            required
          />

          {/* DIRECTOR */}
          <input
            type="text"
            name="director"
            placeholder="Director"
            className="w-full p-2 bg-gray-800 rounded"
            onChange={handleinput}
            required
          />

          {/* DATE */}
          <input
            type="date"
            name="date"
            className="w-full p-2 bg-gray-800 rounded"
            onChange={handleinput}
            required
          />

          {/* LANGUAGE */}
          <select
            name="language"
            className="w-full p-2 bg-gray-800 rounded"
            onChange={handleinput}
            required
          >
            <option value="">Select Language</option>
            {languageslist.map((lang) => (
              <option key={lang._id} value={lang.language}>
                {lang.language}
              </option>
            ))}
          </select>

          {/* GENRE */}
          <select
            name="genre"
            className="w-full p-2 bg-gray-800 rounded"
            onChange={handleinput}
            required
          >
            <option value="">Select Genre</option>
            {genrelist.map((gen) => (
              <option key={gen._id} value={gen.genre}>
                {gen.genre}
              </option>
            ))}
          </select>

          {/* SEASONS */}
          <input
            type="number"
            name="seasons"
            placeholder="Number of Seasons"
            className="w-full p-2 bg-gray-800 rounded"
            onChange={handleinput}
            required
          />

          {/* IMAGE */}
          <input
            type="file"
            name="webseriesImage"
            className="w-full bg-gray-800 p-2 rounded"
            onChange={handleFileInput}
            required
          />

          {/* BANNER */}
          <input
            type="file"
            name="webseriesbanner"
            className="w-full bg-gray-800 p-2 rounded"
            onChange={handleFileInput}
            required
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            className="w-full p-2 bg-gray-800 rounded"
            onChange={handleinput}
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default WebSeriesform;
