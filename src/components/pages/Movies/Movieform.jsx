import React, { useEffect, useRef, useState } from "react";
import ButtonLoader from "../../Loaders/ButtonLoader";

export const Movieform = ({ fetchMovies, setAddmovie }) => {
  const [languageslist, setlanguageslist] = useState([]);
  const [genrelist, setgenrelist] = useState([]);
  const [loading, setLoading] = useState(false);

  const [movie, setMovie] = useState({
    title: "",
    director: "",
    date: "",
    language: "",
    genre: "",
    image: null,
    banner: null,
    description: "",
    videourl: "",
  });

  const imageRef = useRef();
  const bannerRef = useRef();

  useEffect(() => {
    fetchLanguages();
    fetchGenres();
  }, []);

  const fetchLanguages = async () => {
    const res = await fetch("https://movie-flix-product-backend.onrender.com/movieflix/languages");
    const data = await res.json();
    setlanguageslist(data.data || []);
  };

  const fetchGenres = async () => {
    const res = await fetch("https://movie-flix-product-backend.onrender.com/movieflix/genre");
    const data = await res.json();
    setgenrelist(data.data || []);
  };

  const handleinput = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileInput = (e) => {
    const { name, files } = e.target;
    setMovie((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    Object.keys(movie).forEach((key) =>
      formData.append(key, movie[key])
    );

    try {
      const res = await fetch(
        "https://movie-flix-product-backend.onrender.com/movieflix/addmovie",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        fetchMovies();

        setMovie({
          title: "",
          director: "",
          date: "",
          language: "",
          genre: "",
          image: null,
          banner: null,
          description: "",
          videourl: "",
        });

        imageRef.current.value = null;
        bannerRef.current.value = null;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 p-5 rounded-2xl shadow-lg">

      <div className="flex justify-between">
        <h2 className="text-lg mb-4">Add Movie</h2>
        <button onClick={()=>setAddmovie(false)} className="bg-red-500 text-white h-fit px-4 py-2 mb-2 rounded">Cancel</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="title" value={movie.title} onChange={handleinput} placeholder="Title"
          className="w-full bg-slate-700 p-2 rounded" />

        <input name="director" value={movie.director} onChange={handleinput} placeholder="Director"
          className="w-full bg-slate-700 p-2 rounded" />

        <input type="date" name="date" value={movie.date} onChange={handleinput}
          className="w-full bg-slate-700 p-2 rounded" />

        <select name="language" value={movie.language} onChange={handleinput}
          className="w-full bg-slate-700 p-2 rounded">
          <option value="">Language</option>
          {languageslist.map((l) => (
            <option key={l._id}>{l.language}</option>
          ))}
        </select>

        <select name="genre" value={movie.genre} onChange={handleinput}
          className="w-full bg-slate-700 p-2 rounded">
          <option value="">Genre</option>
          {genrelist.map((g) => (
            <option key={g._id}>{g.genre}</option>
          ))}
        </select>

        <input type="file" name="image" ref={imageRef} onChange={handleFileInput}
          className="w-full text-sm" />

        <input type="file" name="banner" ref={bannerRef} onChange={handleFileInput}
          className="w-full text-sm" />

        <textarea name="description" value={movie.description} onChange={handleinput}
          className="w-full bg-slate-700 p-2 rounded" placeholder="Description" />

        <input name="videourl" value={movie.videourl} onChange={handleinput}
          className="w-full bg-slate-700 p-2 rounded" placeholder="Video URL" />

        <button className="w-full bg-blue-500 py-2 rounded flex justify-center">
          {loading ? <ButtonLoader /> : "Submit"}
        </button>

      </form>
    </div>
  );
};



// import React, { use, useEffect, useState } from 'react'

// export const Movieform = () => {

//   const [languageslist, setlanguageslist] = useState([]);

//   const [genrelist, setgenrelist] = useState([]);
//   const [movie, setMovie] = useState({
//     title: "",
//     director: "",
//     date: "",
//     language: "",
//     genre: "",
//     image: null,
//     banner: null,
//     description: "",
//     videourl: ""
//   });
//    useEffect(()=>{
//     getLanguages();
//     getGenres();
//   },[])
//  function getLanguages(){
//    fetch("http://localhost:2025/movieflix/languages",{
//     method:"GET"
//    })
//    .then(res => res.json())
//    .then(data => {
//      setlanguageslist(data.data)
//     // console.log(data.data)
//    })
//    .catch(err => {
//      console.error("Error fetching languages:", err);
//    });
//  }

//   function getGenres(){
//     fetch("http://localhost:2025/movieflix/genre",{
//      method:"GET"
//     })  
//     .then(res => res.json())
//     .then(data => {
//       setgenrelist(data.data)
//      console.log(data.data)
//     })
//     .catch(err => {
//       console.error("Error fetching genres:", err);
//     });   
//   }
//   const image = React.createRef();
//   const banner = React.createRef();



//   function handleinput(e) {
//     const { name, value } = e.target;
//     setMovie(prev => ({ ...prev, [name]: value }));
//   }

//   function handleFileInput(e) {
//     const { name, files } = e.target;
//     setMovie(prev => ({ ...prev, [name]: files[0] }));
//   }
//   function sumbitform(e){
//     e.preventDefault();
//     setTimeout(() => {
//       handleform()
//     }, 1000);
//   }
//   function handleform() {
    
    
//     const formData = new FormData()  

//     Object.keys(movie).forEach( key => formData.append(key, movie[key]))
//     Object.keys(movie).forEach( key => console.log(key, movie[key]))
//     fetch("http://localhost:2025/movieflix/addmovie", {
//       method: "POST",
//       body: formData
//     })
//     .then(res => res.json())
//     .then(data => {
//       if(data.success){
//      alert("Movie added successfully")
//      setMovie({
//       title: "",
//       director: "",
//       date: "",
//       language: "",
//       genre: "",
//       description: "",
//       videourl: ""
//       })
//       image.current.value = null;
//       banner.current.value = null;
//     }else{
//       alert("Failed to add movie")
//     }   
//     })
//     .catch(err => {
//       console.error("Error adding movie:", err);
//     });
    
//   } 

//   return (
//     <div className='movie-form'>
//       <div className="h4">Add New Movie</div>

//       <form onSubmit={sumbitform}>

//         <label>Title:</label>
//         <input type="text" name='title' value={movie.title} onChange={handleinput} required/>

//         <label>Director:</label>
//         <input type="text" name='director' value={movie.director} onChange={handleinput} required/>

//         <label>Release Date:</label>
//         <input type="date" name='date' value={movie.date} onChange={handleinput} required />

//         <label>Languages</label>
//         <select name="language" value={movie.language} onChange={handleinput} required>
//           <option value="" disabled>-------</option>
//           {languageslist?.map((lang, i) =>
//             <option key={lang._id} value={lang.language}>{lang.language}</option>
//           )}
//         </select>

//         <label>Genre:</label>
//         <select name="genre" onChange={handleinput} value={movie.genre} required>
//           <option value="" disabled>-------</option>
//           {genrelist?.map((gen, i) =>
//             <option key={gen._id} value={gen.genre}>{gen.genre}</option>
//           )}
//         </select>

//         <label>Image:</label>
//         <input type="file" name="image" className='form-control' ref={image} onChange={handleFileInput} required />

//         <label>Banner:</label>
//         <input type="file" name="banner" className='form-control' ref={banner} onChange={handleFileInput} required />

//         <label>Description:</label>
//         <textarea name='description' value={movie.description} onChange={handleinput} required></textarea>

//         <label>Video URL:</label>
//         <input type="url" name='videourl' value={movie.videourl} onChange={handleinput} required />

//         <button className="btn btn-primary mt-1" type="submit">
//           Submit
//         </button>
//         <input type="reset" className="btn btn-secondary mt-1" />

//       </form>
//     </div>
//   )
// }
