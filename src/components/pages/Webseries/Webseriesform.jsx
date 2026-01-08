import React, { useEffect, useState } from 'react'

export const WebSeriesform = ({SeasonPopUp, setSeasonsCount, setWebseriesId }) => {

  const [languageslist, setLanguageslist] = useState([]);

  const [genrelist, setGenrelist] = useState([]);
  // const [webseriesId, setWebseriesId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {   
    fetchLanguages();
    fetchGenres();
  }
    , []);

  const fetchLanguages = () => {
    fetch("http://localhost:2025/movieflix/languages", {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {
        if (!data.data.success) {
        setLanguageslist(data.data);
        }

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const fetchGenres = () => {
    fetch("http://localhost:2025/movieflix/genre", {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {
        if (!data.data.success) {
        setGenrelist(data.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      }); 
  }


  const [movie, setMovie] = useState({
    title: "",
    director: "",
    date: "",
    language: "",
    genre: "",
    webseriesImage: null,
    webseriesbanner: null,
    description: "",
    seasons: 0});

  function handleinput(e) {
    const { name, value } = e.target;
    if(name === 'seasons'){
      if( value <= 0){
        alert("seasons must be greater than 0");
        return;
      }
    }
    
    setMovie(prev => ({ ...prev, [name]: value }));
  }

  function handleFileInput(e) {
    const { name, files } = e.target;
    setMovie(prev => ({ ...prev, [name]: files[0] }));
  }


  function handleform(e) {
    e.preventDefault();
    if(isSubmitting) return ;
    setIsSubmitting(true)
   setSeasonsCount(parseInt( movie.seasons));
    console.log("form submitted", movie);
    const formData = new FormData()  
    Object.keys(movie).forEach( key => formData.append(key, movie[key]))
    
    // Object.keys(movie).forEach( key => console.log(key, movie[key]))

    
    fetch("http://localhost:2025/movieflix/webseries", {
      method: "POST",
      body: formData    
    })
    .then(res => res.json())
    .then(data => {
      if(data.success){
        console.log("Inserted ID:", data);
        setWebseriesId(data.id.insertedId);
        console.log("Web series added successfully");
        alert("Web series added successfully");
        SeasonPopUp(true);
        
      } else {
        console.log("Failed to add web series");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(()=>{
      isSubmitting(false)
    }); 
   
    
}


  return (
    <div className='movie-form'>
      <div className="h4">Add New Movie</div>

      <form onSubmit={handleform}>

        <label>Title:</label>
        <input type="text" name='title'  onChange={handleinput} required/>

        <label>Director:</label>
        <input type="text" name='director' onChange={handleinput}  required/>

        <label>Release Date:</label>
        <input type="date" name='date' onChange={handleinput} required />

        <label>Languages</label>
        <select name="language" onChange={handleinput} required>
          <option value="" disabled>-------</option>
          {languageslist?.map((lang, i) =>
            <option key={lang._id} value={lang.language}>{lang.language}</option>
          )}
        </select>

        <label>Genre:</label>
        <select name="genre" onChange={handleinput} reqeuired>
          <option value="" disabled>-------</option>
          {genrelist?.map((gen, i) =>
            <option key={gen._id} value={gen.genre}>{gen.genre}</option>
          )}
        </select>
        <label>Number of Seasons</label>
        <input type="number" name='seasons' onChange={handleinput}  required/>
        <label>Image:</label>
        <input type="file" name="webseriesImage" className='form-control' onChange={handleFileInput} required />

        <label>Banner:</label>
        <input type="file" name="webseriesbanner" className='form-control' onChange={handleFileInput} required />

        <label>Description:</label>
        <textarea name='description' onChange={handleinput} required></textarea>

        <button className="btn btn-primary mt-1" type="submit"  >
          Submit
        </button>
        <input type="reset" className='btn btn-secondary mt-1' />
      </form>
    </div>
  )
}
