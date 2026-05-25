import { useState } from "react";

export default function AddSeasons({
  
  webseriesId,
  setShowSeasonPopUp,
  setShowWebSerieslist,
  fetchWebSerie

}) {
  const [seasons, setSeasons] = useState([
    {
      seasonNumber: 1,
      title: "",
      image: null,
    },
  ]);

  // ADD NEW SEASON
  function AddSeasonField() {
    setSeasons((prev) => [
      ...prev,
      {
        seasonNumber: prev.length + 1,
        title: "",
        image: null,
      },
    ]);
  }

  // REMOVE SEASON
  function RemoveSeason(index) {
    const updated = seasons
      .filter((_, i) => i !== index)
      .map((s, i) => ({
        ...s,
        seasonNumber: i + 1,
      }));

    setSeasons(updated);
  }

  // HANDLE INPUT
  function HandleChange(index, field, value) {
    const updated = [...seasons];

    updated[index][field] = value;

    setSeasons(updated);
  }

  // SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData();

    seasons.forEach((season, index) => {
      fd.append(
        `season${index + 1}_title`,
        season.title
      );

      fd.append(
        `season${index + 1}_image`,
        season.image
      );
    });

    try {
      const res = await fetch(
        `http://localhost:2025/movieflix/webseries/seasons/${webseriesId}`,
        {
          method: "POST",
          body: fd,
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Seasons added successfully");

        setShowSeasonPopUp(false);
        setShowWebSerieslist(true);
        fetchWebSerie();
      }
    } catch (err) {
      console.log(err);
      alert("Failed to add seasons");
    }
  }

  return (
    <div className="flex justify-center items-center bg-gray-900 p-4 rounded-xl">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full"
      >
        <h2 className="text-xl font-bold text-white">
          Add Seasons
        </h2>

        {seasons.map((season, index) => (
          <div
            key={index}
            className="p-4 bg-gray-800 rounded-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-bold text-blue-400">
                Season {season.seasonNumber}
              </p>

              {seasons.length > 1 && (
                <button
                  type="button"
                  onClick={() => RemoveSeason(index)}
                  className="bg-red-600 px-2 py-1 rounded text-xs"
                >
                  Remove
                </button>
              )}
            </div>

            <input
              type="text"
              placeholder="Season Title"
              value={season.title}
              onChange={(e) =>
                HandleChange(
                  index,
                  "title",
                  e.target.value
                )
              }
              className="w-full p-2 mb-2 bg-gray-700 rounded"
            />

            <input
              type="file"
              onChange={(e) =>
                HandleChange(
                  index,
                  "image",
                  e.target.files[0]
                )
              }
              className="w-full"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={AddSeasonField}
          className="bg-green-600 px-4 py-2 rounded w-full"
        >
          + Add Another Season
        </button>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              setShowSeasonPopUp(false);
              setShowWebSerieslist(true);
            }}
            className="bg-gray-600 px-4 py-2 rounded w-full"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded w-full"
          >
            Save Seasons
          </button>
        </div>
      </form>
    </div>
  );
}

// import { Toast } from "bootstrap";
// import { useState } from "react";
// export default function AddSeasons({
//   SeasonsCount,
//   webseriesId,
//   setUi,
//   SeasonPopUp
// }) {
//   const [seasons, setSeasons] = useState({});
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const fd = new FormData();
//     Object.entries(seasons).forEach(([k, v]) => {
//       fd.append(`${k}_title`, v.title);
//       fd.append(`${k}_image`, v.image);
//     });

//    const res = await fetch(
//       `http://localhost:2025/movieflix/webseries/seasons/${webseriesId}`,
//       { method: "POST", body: fd }
//     );
//     if(res.data.success){
//     Toast("season successfully added",success)
//     // setUi((p) => ({ ...p, showSeasonPopup: false }));
//     SeasonPopUp(false)
    
//     }

//   };

//   return (
//     <div className="flex justify-center items-center bg-gray-800 p-4">
//     <form onSubmit={handleSubmit} className="space-y-4">

//       {Array.from({ length: SeasonsCount }).map((_, i) => (
//         <div key={i} className="p-2 bg-gray-800 rounded">

//           <p className="font-bold text-primary mb-1">Season {i + 1}</p>

//           <input
//             className="w-full p-1 mb-2 bg-gray-700 rounded-lg"
//             placeholder="Title"
//             onChange={(e) =>
//               setSeasons((p) => ({
//                 ...p,
//                 [`season${i + 1}`]: {
//                   ...p[`season${i + 1}`],
//                   title: e.target.value,
//                 },
//               }))
//             }
//           />

//           <input
//             type="file"
//             onChange={(e) =>
//               setSeasons((p) => ({
//                 ...p,
//                 [`season${i + 1}`]: {
//                   ...p[`season${i + 1}`],
//                   image: e.target.files[0],
//                 },
//               }))
//             }
//           />
//         </div>
//       ))}

//       <button className="btn bg-green-600 w-full py-2 rounded">
//         Save Seasons  
//       </button>
//     </form>
//     </div>
//   );
// }



// import React, { use, useRef } from 'react'
// // import AddSeasonForm from './AddSeasonForm'
// import { useState } from 'react'
// export const AddSeasons = ({SeasonPopUp, SeasonsCount, webseriesId}) => {
//   let initialseasons = Array.from({length: SeasonsCount}).reduce((acc, _, index) => {
//       acc[`season${index + 1}`] = { title: "", image: null };
//       return acc;
//     }, {});
//     const [seasons, setSeasons] = useState(initialseasons);
//     console.log("seasons state:", seasons);
//   function ClosePopUp(){
//     console.log("close popup");
//     SeasonPopUp(false);
//   }   
//   function handleInput(e, index){
//     const {name, value} = e.target;
//     const key = `season${parseInt(index) + 1}`;
//     setSeasons(prev => ({...prev, [key]: {...prev[key], [name]: value}}));
//     // console.log("seasons after input:", seasons);
//   }   
//   function handlefile(e,index){
//     const file = e.target.files[0];
//     const {name} = e.target;
//     console.log("file selected:", file);
//     const key = `season${index + 1}`;
//     setSeasons(prev => ({...prev, [key]: {...prev[key], [name]: file}}));

//   }  
//   function handleSubmit(e){
//     e.preventDefault();
//     const formData = new FormData();
//     Object.entries(seasons).forEach(([key, value]) => {
//       formData.append(`${key}_title`, value.title);
//       formData.append(`${key}_image`, value.image);
//       // formData.append('webseriesId', webseriesId);
//     });

//     Object.entries(seasons).forEach(([key, value]) => {
//       // console.log(`${key} - Title: ${value.title}, Image: ${value.image}`);
//       console.log(`${key}_title`, formData.get(`${key}_title`));
//       console.log(`${key}_image`, formData.get(`${key}_image`));

//     });
//     // Now you can send formData to your backend
//     // console.log("Submitting seasons:", seasons);
//     fetch(`http://localhost:2025/movieflix/webseries/seasons/${webseriesId}`, {
//       method: "POST",
//       body: formData, 
//     })  
//     .then(res => res.json())
//     .then(data => {
//       if(data.success){
//         console.log(data.data)
//         console.log("Seasons added successfully");
//         alert("Seasons added successfully");
//         SeasonPopUp(false);
      

//       } else {
//         console.error("Failed to add seasons");
//         alert("Failed to add seasons");
//       } 
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
//   }
//   return (
//     <div>
//         <button className='btn btn-danger position-absolute top-0 end-0 m-2  font-size-22' onClick={ClosePopUp}>x</button>
//         <h5 className='my-4'>Add Seasons for Web series</h5>
//         <form>
//         {  Array.from({length: SeasonsCount}).map((_, index) => (
//              <div key={index} className="seasonform  p-2 border">
//                 <h6>Season{index + 1}</h6>
//             <div className="d-flex gap-5">
//                 <div className="form-group col-2">
//                 <label >season Number</label>
//                 <input className="form-control" value={index + 1} readOnly width="20px"    placeholder="Enter Number of Episodes" />
//             </div>
//             <div className="form-group col-6">
//                 <label >Season Title</label>
//                 <input type="text" className="form-control" name='title'  onChange={(e) =>handleInput(e,index)} placeholder="Enter Season Title" />
//             </div>

//             </div>
//             <div>
//                 <label > Image</label>
//                 <input type="file" className="form-control" name="image" onChange={(e) =>handlefile(e, index)}/>
//             </div>
//             </div>
//             ))}
//             <div className='d-flex justify-content-between'>
//                <button className='btn btn-danger' onClick={ClosePopUp}>close</button>
//                <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit}>Add Season</button>
//             </div>
          
//         </form>
        

//     </div>
//   )
// }
