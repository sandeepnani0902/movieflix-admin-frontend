import React, { use, useEffect, useState } from 'react'

export const Movieform = () => {

  const [languageslist, setlanguageslist] = useState([]);

  const [genrelist, setgenrelist] = useState([]);
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    date: "",
    language: "",
    genre: "",
    image: null,
    banner: null,
    description: "",
    videourl: ""
  });
   useEffect(()=>{
    getLanguages();
    getGenres();
  },[])
 function getLanguages(){
   fetch("http://localhost:2025/movieflix/languages",{
    method:"GET"
   })
   .then(res => res.json())
   .then(data => {
     setlanguageslist(data.data)
    // console.log(data.data)
   })
   .catch(err => {
     console.error("Error fetching languages:", err);
   });
 }

  function getGenres(){
    fetch("http://localhost:2025/movieflix/genre",{
     method:"GET"
    })  
    .then(res => res.json())
    .then(data => {
      setgenrelist(data.data)
     console.log(data.data)
    })
    .catch(err => {
      console.error("Error fetching genres:", err);
    });   
  }
  const image = React.createRef();
  const banner = React.createRef();



  function handleinput(e) {
    const { name, value } = e.target;
    setMovie(prev => ({ ...prev, [name]: value }));
  }

  function handleFileInput(e) {
    const { name, files } = e.target;
    setMovie(prev => ({ ...prev, [name]: files[0] }));
  }
  function sumbitform(e){
    e.preventDefault();
    setTimeout(() => {
      handleform()
    }, 1000);
  }
  function handleform() {
    
    
    const formData = new FormData()  

    Object.keys(movie).forEach( key => formData.append(key, movie[key]))
    Object.keys(movie).forEach( key => console.log(key, movie[key]))
    fetch("http://localhost:2025/movieflix/addmovie", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if(data.success){
     alert("Movie added successfully")
     setMovie({
      title: "",
      director: "",
      date: "",
      language: "",
      genre: "",
      description: "",
      videourl: ""
      })
      image.current.value = null;
      banner.current.value = null;
    }else{
      alert("Failed to add movie")
    }   
    })
    .catch(err => {
      console.error("Error adding movie:", err);
    });
    
  } 

  return (
    <div className='movie-form'>
      <div className="h4">Add New Movie</div>

      <form onSubmit={sumbitform}>

        <label>Title:</label>
        <input type="text" name='title' value={movie.title} onChange={handleinput} required/>

        <label>Director:</label>
        <input type="text" name='director' value={movie.director} onChange={handleinput} required/>

        <label>Release Date:</label>
        <input type="date" name='date' value={movie.date} onChange={handleinput} required />

        <label>Languages</label>
        <select name="language" value={movie.language} onChange={handleinput} required>
          <option value="" disabled>-------</option>
          {languageslist?.map((lang, i) =>
            <option key={lang._id} value={lang.language}>{lang.language}</option>
          )}
        </select>

        <label>Genre:</label>
        <select name="genre" onChange={handleinput} value={movie.genre} required>
          <option value="" disabled>-------</option>
          {genrelist?.map((gen, i) =>
            <option key={gen._id} value={gen.genre}>{gen.genre}</option>
          )}
        </select>

        <label>Image:</label>
        <input type="file" name="image" className='form-control' ref={image} onChange={handleFileInput} required />

        <label>Banner:</label>
        <input type="file" name="banner" className='form-control' ref={banner} onChange={handleFileInput} required />

        <label>Description:</label>
        <textarea name='description' value={movie.description} onChange={handleinput} required></textarea>

        <label>Video URL:</label>
        <input type="url" name='videourl' value={movie.videourl} onChange={handleinput} required />

        <button className="btn btn-primary mt-1" type="submit">
          Submit
        </button>
        <input type="reset" className="btn btn-secondary mt-1" />

      </form>
    </div>
  )
}
