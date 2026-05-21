import React, { useEffect, useState, useRef } from "react";
import Table from "../../Tables/Table";
import MediaViewer from '../../MediaViewers/MediaViewer'
import TableSkeleton from "../../Loaders/TableSkeleton";
import axios from "axios";

export const Episode = ({
  SelectedWebseriesId,
  setShowEpisodePage,
}) => {
  const [webseriesdata, setWebseriesdata] = useState([]);
  const [currentSeries, setCurrentSeries] = useState(null);
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState(null);

  const episodebanner = useRef();

  const [form, setForm] = useState({
    season: "",
    episodenumber: "",
    episodetitle: "",
    videoURL: "",
    episodebanner: null,
  });

  // 🔹 Fetch
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:2025/movieflix/webseries"
      );
      setWebseriesdata(res.data.data);

      const current = res.data.data.find(
        (ws) => ws._id === SelectedWebseriesId
      );
      setCurrentSeries(current);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Input
  const handleInput = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFile = (e) => {
    setForm((prev) => ({
      ...prev,
      episodebanner: e.target.files[0],
    }));
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((k) =>
      formData.append(k, form[k])
    );
    formData.append("webseriesId", SelectedWebseriesId);

    const res = await fetch(
      `http://localhost:2025/movieflix/webseries/season/addepisode/${SelectedWebseriesId}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Episode added");
      fetchData();
      setForm({
        season: "",
        episodenumber: "",
        episodetitle: "",
        videoURL: "",
        episodebanner: null,
      });
      episodebanner.current.value = null;
    }
  };

  // 🔹 Delete
  const deleteEpisode = async (wsId, season, episode) => {
    if (!window.confirm("Delete episode?")) return;

    await fetch(
      `http://localhost:2025/movieflix/webseries/${wsId}/seasons/${season}/episodes/${episode}`,
      { method: "DELETE" }
    );

    fetchData();
  };

  // 🔥 Table Columns
  const columns = [
    {
      title: "Poster",
      render: (row) => (
        <img
          src={`http://localhost:2025/${row.banner}`}
          className="w-12 h-12 rounded object-cover cursor-pointer"
          onClick={() =>
            setMedia({
              url: `http://localhost:2025/${row.banner}`,
              type: "image",
              title: row.title,
            })
          }
        />
      ),
    },
    {
      title: "Season",
      render: (row) => <span>{row.season}</span>,
    },
    {
      title: "Episode",
      render: (row) => <span>{row.episode}</span>,
    },
    {
      title: "Title",
      render: (row) => <span>{row.title}</span>,
    },
    {
      title: "Action",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() =>
              setMedia({
                url: row.video,
                type: "video",
                title: row.title,
              })
            }
            className="text-green-400"
          >
            ▶
          </button>

          <button
            onClick={() =>
              deleteEpisode(
                SelectedWebseriesId,
                row.seasonKey,
                row.episodeKey
              )
            }
            className="text-red-400"
          >
            🗑
          </button>
        </div>
      ),
    },
  ];

  // 🔹 Flatten data
  // const tableData =
  //   currentSeries?.seasons.flatMap((s) =>
      
  //     s.episodes.map((ep) => ({
  //       banner: ep.banner,
  //       season: `S${s.seasonNumber}`,
  //       episode: `E${ep.episodeNumber}`,
  //       title: ep.title,
  //       video: ep.videourl,
  //       seasonKey: `season${s.seasonNumber}`,
  //       episodeKey: `episode${ep.episodeNumber}`,
  //     }))
  //   ) || [];
  
  const tableData =
  currentSeries?.seasons?.flatMap((s) =>
    (s?.episodes || []).map((ep) => ({
      banner: ep?.banner,
      season: `S${s.seasonNumber}`,
      episode: `E${ep.episodeNumber}`,
      title: ep?.title,
      video: ep?.videourl,
      seasonKey: `season${s.seasonNumber}`,
      episodeKey: `episode${ep.episodeNumber}`,
    }))
  ) || [];


  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

      {/* Header */}
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">
          Episode Management
        </h2>

        <button
          onClick={() => setShowEpisodePage(false)}
          className="bg-gray-700 px-4 py-2 rounded"
        >
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* FORM */}
        <div className="bg-slate-800 p-4 rounded-xl space-y-3">
          <h3>Add Episode</h3>

          <form onSubmit={handleSubmit} className="space-y-2">

            <select
              name="season"
              value={form.season}
              onChange={handleInput}
              className="w-full bg-slate-700 p-2 rounded"
            >
              <option value="">Select Season</option>
              {currentSeries?.seasons.map((s) => (
                <option key={s.seasonNumber} value={s.seasonNumber}>
                  Season {s.seasonNumber}
                </option>
              ))}
            </select>

            <input
              name="episodenumber"
              placeholder="Episode No"
              value={form.episodenumber}
              onChange={handleInput}
              className="w-full bg-slate-700 p-2 rounded"
            />

            <input
              name="episodetitle"
              placeholder="Title"
              value={form.episodetitle}
              onChange={handleInput}
              className="w-full bg-slate-700 p-2 rounded"
            />

            <input
              name="videoURL"
              placeholder="Video URL"
              value={form.videoURL}
              onChange={handleInput}
              className="w-full bg-slate-700 p-2 rounded"
            />

            <input
              type="file"
              ref={episodebanner}
              onChange={handleFile}
              className="w-full"
            />

            <button className="bg-blue-600 w-full py-2 rounded">
              Add Episode
            </button>
          </form>
        </div>

        {/* TABLE */}
        <div className="lg:col-span-3">
          {loading ? (
            <TableSkeleton rows={5} cols={5} />
          ) : (
            <Table
              title={`Episodes (${tableData.length})`}
              columns={columns}
              data={tableData}
            />
          )}
        </div>

      </div>

      {/* MEDIA VIEWER */}
      {media && (
        <MediaViewer
          media={media}
          onClose={() => setMedia(null)}
        />
      )}
    </div>
  );
};



// import React, { useEffect, useRef, useState } from 'react';
// import { Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import '../../pagescss/episode.css';

// export const Episode = ({
//   SelectedWebseriesId,
//   setShowEpisodePage,
//   CurrentSeasonNumber
// }) => {

//   const [webseriesdata, setWebseriesdata] = useState([]);
//   const [currentSeriesData, setCurrentSeriesData] = useState([])
//   const [episodeFormData, setEpisodeFormData] = useState({
//     season: '',
//     episodenumber: '',
//     episodetitle: '',
//     videoURL: '',
//     episodebanner: null
//   });

//   const episodebanner = useRef()
//   /* ================= FETCH WEB SERIES ================= */
//   useEffect(() => {
//     getwebseriesdata();
    
//   }, []);
  
//   useEffect(()=>{
//     if(webseriesdata?.length > 0){
//         filterCurrentSeries();
//     }
//   },[webseriesdata])

//   const getwebseriesdata = async () => {
//     try {
//       const res = await axios.get('http://localhost:2025/movieflix/webseries');
//       setWebseriesdata(res.data.data);
//     } catch (error) {
//       console.error('Error fetching web series data:', error);
//     }
//   };

//   const filterCurrentSeries = ()=>{
//     const filteredData = webseriesdata.filter( ws => ws._id === SelectedWebseriesId)
//     setCurrentSeriesData(filteredData)

//   }


//   /* ================= NAVIGATION ================= */
//   const BackToSeasons = () => {
//     setShowEpisodePage(false);
//   };

//   /* ================= INPUT HANDLERS ================= */
//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setEpisodeFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFile = (e) => {
//     const file = e.target.files[0];
//     const name = e.target.name;
//     setEpisodeFormData(prev => ({
//       ...prev,
//       [name]: file
//     }));
//   };

//   /* ================= FORM SUBMIT ================= */
//   const handleEpisodeForm = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.keys(episodeFormData).forEach(key => {
//       formData.append(key, episodeFormData[key]);
//     });
//     formData.append('webseriesId', SelectedWebseriesId);

//     try {
//       const res = await fetch(
//         `http://localhost:2025/movieflix/webseries/season/addepisode/${SelectedWebseriesId}`,
//         {
//           method: 'POST',
//           body: formData
//         }
//       );

//       const data = await res.json();

//       if (data.success) {
//         alert('✅ Episode added successfully!');
//         getwebseriesdata();
//         // RESET FORM
//         setEpisodeFormData({
//           season: '',
//           episodenumber: '',
//           episodetitle: '',
//           videoURL: '',
//           episodebanner: null
//         });
//         episodebanner.current.value = null
        

//       } else {
//         alert('❌ Failed to add episode');
//       }

//     } catch (error) {
//       console.error('Error while adding episode:', error);
//       alert('❌ Server error');
//     }
//   };

//   function playvideo(url){
//     window.open(url)
//   }
//   function deleteEpisode(e, webSeriesId, season, episode){
//     e.preventDefault()

//    if(confirm(`Do you want to  delete episode , ${webSeriesId}, ${season}, ${episode}`)){
//         fetch(
//     `http://localhost:2025/movieflix/webseries/${webSeriesId}/seasons/${season}/episodes/${episode}`,
//         {
//           method: "DELETE"
//         }
//       )
//       .then(res => res.json())
//       .then(data =>
//        {
//         if(data.success){
//           getwebseriesdata();
//         }
//        }
//       )
//       .catch(err => console.error(err));
//    }
//    else{
//     alert("episode not deleted")
//    }
//   }

//   /* ================= JSX ================= */
//   return (
//     <div className="episode-page">
//       <div className="episode-container">

//         {/* HEADER */}
//         <div className="episode-header">
//           <h2>Episode Management for Web Series</h2>
//           <button className="btn back-button" onClick={BackToSeasons}>
//             Back to Seasons
//           </button>
//         </div>

//         <hr />

//         {/* WEB SERIES INFO */}
//         <div className="series-information">
//           <h4>Web Series Information</h4>

//           {webseriesdata
//             .filter(ws => ws._id === SelectedWebseriesId)
//             .map(ws => (
//               <ul className="info-list" key={ws._id}>
//                 <li><b>Title:</b> {ws.title}</li>
//                 <li><b>Director:</b> {ws.director}</li>
//                 <li><b>Language:</b> {ws.language}</li>
//                 <li><b>Seasons:</b> {ws.seasons.length}</li>
//                 <li><b>Genre:</b> {ws.genre}</li>
//                 {/* <li><b>Episodes:</b> {ws.seasons?.episodes?.length || 0}</li> */}
//                 <li>
//                 <b>Episodes:</b>{' '}
//                 {ws.seasons.reduce(
//                     (total, season) => total + (season.episodes?.length || 0),
//                     0
//                 )}
//                 </li>

//               </ul>
//             ))}
//         </div>

//         <Row>
//           {/* ================= FORM ================= */}
//           <Col lg={3}>
//             <div className="episode-form">
//               <h5>Add New Episode</h5>

//               <form onSubmit={handleEpisodeForm}>
//                 {/* SEASON */}
//                 <div className="form-group">
//                   <label>Season Number:</label>
//                   <select
//                     name="season"
//                     className="w-100"
//                     value={episodeFormData.season}
//                     onChange={handleInput}
//                     required
//                   >
//                     <option value="">---------</option>
//                     {webseriesdata
//                       .filter(ws => ws._id === SelectedWebseriesId)
//                       .map(ws =>
//                         ws.seasons.map((season, i) => (
//                           <option key={i} value={season.seasonNumber}>
//                             Season {season.seasonNumber}
//                           </option>
//                         ))
//                       )}
//                   </select>
//                 </div>

//                 {/* EPISODE NUMBER */}
//                 <div className="form-group">
//                   <label>Episode Number:</label>
//                   <input
//                     type="number"
//                     name="episodenumber"
//                     value={episodeFormData.episodenumber}
//                     onChange={handleInput}
//                     placeholder="Enter episode number"
//                     required
//                   />
//                 </div>

//                 {/* TITLE */}
//                 <div className="form-group">
//                   <label>Title:</label>
//                   <input
//                     type="text"
//                     name="episodetitle"
//                     value={episodeFormData.episodetitle}
//                     onChange={handleInput}
//                     placeholder="Enter episode title"
//                     required
//                   />
//                 </div>

//                 {/* VIDEO URL */}
//                 <div className="form-group">
//                   <label>Video URL:</label>
//                   <input
//                     type="url"
//                     name="videoURL"
//                     value={episodeFormData.videoURL}
//                     onChange={handleInput}
//                     placeholder="Enter video URL"
//                     required
//                   />
//                 </div>

//                 {/* BANNER */}
//                 <div className="form-group">
//                   <label>Banner:</label>
//                   <input
//                     type="file" 
//                     ref={episodebanner}
//                     name="episodebanner"
//                     className="form-control"
//                     accept="image/*"
//                     onChange={handleFile}
//                     required
//                   />
//                 </div>

//                 <button type="submit" className="btn btn-primary w-100">
//                   Add Episode
//                 </button>
//               </form>
//             </div>
//           </Col>

//           {/* ================= EPISODE LIST ================= */}
//           <Col lg={9}>
//             <div className="episode-list">
//               <h6>Episode List</h6>

//               <table>
//                 <thead>
//                   <tr>
//                     <th>Image</th>
//                     <th>Season</th>
//                     <th>Episode</th>
//                     <th>Title</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                     <tbody>
//                         {
//                             currentSeriesData?.length > 0 && currentSeriesData?.map( ws => 
//                              ws.seasons.map( (season, sI) =>
//                                 season.episodes?.map( (episode, ei) =>
//                                     <tr key={ei}>
//                                         <td>
//                                           {console.log(episode)}
//                                            <a href={`http://localhost:2025/${episode.banner}`} target='_blank'><img src={`http://localhost:2025/${episode.banner}`} alt={episode.title} width={50}/></a> 
//                                         </td>
//                                         <td>season{season.seasonNumber}</td>
//                                         <td>episode{episode.episodeNumber}</td>
//                                         <td>{episode.title}</td>
//                                         <td>
//                                             <div className='d-flex justify-content-center align-items-center gap-2'>
//                                                 <button className='btn btn-primary' onClick={(() =>playvideo(episode?.videourl))}><i class="bi bi-play" aria-hidden="true"></i></button>
//                                                 <button className='btn btn-danger' onClick={(e)=> deleteEpisode(e, ws._id, `season${season.seasonNumber}`,`episode${episode.episodeNumber}`)}><i class="bi bi-trash" aria-hidden="true"></i></button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ) 
//                             )
//                             )
//                         }
//                     </tbody>
//                     </table>

//             </div>
//           </Col>
//         </Row>

//       </div>
//     </div>
//   );
// };
