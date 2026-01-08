import React, { useState, useEffect, lazy, Suspense } from 'react'
const AddSeasons = lazy(() => import('./AddSeasons').then(module => ({ default: module.AddSeasons })));
const WebSeriesform = lazy(() => import('./Webseriesform').then(module => ({ default: module.WebSeriesform })));
import '../../pagescss/webseries.css'
import axios from 'axios';
import { Episode } from './Episode';
import UpdateSeriesForm from './UpdateSeriesForm';
import UpdateseasonForm from './updateseasonForm';
function WebSeries() {
//   const [webSeries , setWebSeries] = useState([{
//       maintitle:"the witcher",
//       director:"sandeep",
//       language:"telugu",
//       seasons:[
//         {
//           season:"season1",
//           title:"the witcher1",
//           episodes:4,
//           actions:["Add Episodes", "Delete Episodes"]
//         },
//       {
//           season:"season2",
//           title:"the witcher2",
//           episodes:1,
//           actions:["Add Episodes", "Delete Episodes"]
//         }
//       ],
//       actions:["Manage Season", "Delete Series"]
//   },
//   {
//       maintitle:"heart hacker",
//       director:"nani",
//       language:"telugu",
//       seasons:[
//         {
//           season:"season1",
//           title:"Heart Fall In",
//           episodes:2,
//           actions:["Add Episodes", "Delete Episodes"]
//         }
//       ,
//       {
//           season:"season2",
//           title:"first Meet",
//           episodes:5,
//           actions:["Add Episodes", "Delete Episodes"]
//         }
//       ],
//       actions:["Manage Season", "Delete Series"]
//     },
//      {
//       maintitle:"heart hacker",
//       director:"nani",
//       language:"telugu",
//       seasons:[
//         {
//           season:"season1",
//           title:"Heart Fall In",
//           episodes:2,
//           actions:["Add Episodes", "Delete Episodes"]
//         }
//       ],
//       actions:["Manage Season", "Delete Series"]
//     } ,
//      {
//       maintitle:"heart hacker",
//       director:"nani",
//       language:"telugu",
//       seasons:[
//         {
//           season:"season1",
//           title:"Heart Fall In",
//           episodes:2,
//           actions:["Add Episodes", "Delete Episodes"]
//         }
//       ,
//       {
//           season:"season2",
//           title:"first Meet",
//           episodes:5,
//           actions:["Add Episodes", "Delete Episodes"]
//         }
//       ],
//       actions:["Manage Season", "Delete Series"]
//     } ,
//      {
//       maintitle:"heart hacker",
//       director:"nani",
//       language:"telugu",
//       seasons:[
//         {
//           season:"season1",
//           title:"Heart Fall In",
//           episodes:1,
//           actions:["Add Episodes", "Delete Episodes"]
//         }
//       ],
//       actions:["Manage Season", "Delete Series"]
//     }  
// ])
 const [webSeries , setWebSeries] = useState([]);
 const [showSeasonPopUp, setShowSeasonPopUp] = useState(false);
 const [SeasonsCount, setSeasonsCount] = useState(0);
 const [webseriesId, setWebseriesId] = useState(null);
 const [CurrentSeasonNumber, setCurrentSeasonNumber] = useState(null);
 const [SelectedWebseriesId, setSelectedWebseriesId] = useState(null);  
 const [showEpisodePage, setShowEpisodePage] = useState(false);
 const [showupdateSeasonForm, setshowupdateSeasonForm] = useState(false);
 const [showUpdateSereisForm, setShowUpdateSeriesForm] = useState(false)
 const [UpdatedSeasonData, setUdatedSeasonData] = useState({
  id:null,
  seasonNumber:null,
  title:null,
 })
   useEffect(()=>{
    fetchWebSeries();   
    },[])

//  retrive web series data from backend
 async function fetchWebSeries(){
    const res = await axios.get("http://localhost:2025/movieflix/webseries");
    // console.log(res.data.data);
    setWebSeries(res.data.data);

  }

  // collection form data 

 
  function handleseasonform(e){
    e.preventDefault()
    console.log(UpdatedSeasonData)
    // console.log(wsId, season)
    (false)
  }

  // delete webseries from db
   function DeleteWebseriesDb(e,id){
    e.preventDefault()
    if(confirm("Do you want to delete webserie")){
    axios.delete(`http://localhost:2025/movieflix/webseries/${id}`)
    .then((res)=>{
      // console.log(res.data);
      fetchWebSeries();
    })
    .catch((err)=>{
      console.error("error while deleting webseries:", err.sessage);
    })  
  }
   }

  //  manage seasons
    function ManageSeries(e,id){ 
    e.preventDefault();
    console.log("manage seasons for webseries id:", id);
    console.log(webseriesId)
    setShowUpdateSeriesForm(true)
    setWebseriesId(id)
      
    }
    function ManageSeason(e, wsId, seasonNumber){
      e.preventDefault()
      // const seasonNumber = Number(season)
      setUdatedSeasonData( prev  => ({...prev, seasonNumber:Number(seasonNumber),
                                               id:wsId
                                             }))
      setshowupdateSeasonForm(true)  
    }
   //update season title 
   
   function SendUpdateSeason(){
    console.log(UpdatedSeasonData)
    fetch(`http://localhost:2025/movieflix/webseries/${UpdatedSeasonData.id}/seasons/${UpdatedSeasonData.seasonNumber}/updatetitle`,{
      method:"POST",
      body:JSON.stringify({title:UpdatedSeasonData.title}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then( res => res.json())
    .then( data => {
      if(data.success){
        alert("season title updated")
        fetchWebSeries()
      }

    })
    .catch(err => alert(err.message))
    setshowupdateSeasonForm(false)

   }

  // add seasons
    function ViewEpisodes(e, id,seasonNumber){
      e.preventDefault();
      setSelectedWebseriesId(id);
      setCurrentSeasonNumber(seasonNumber)
      setShowEpisodePage(true);
    }
  // delete season
    function DeleteSeason(e,id, seasonNumber){
      e.preventDefault();
      console.log("delete season for webseries id:", id, "season number:", seasonNumber);
      if(confirm(`are you sure to delete season ${seasonNumber}`)){
      fetch(`http://localhost:2025/movieflix/webseries/${id}/seasons/${seasonNumber}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        }
      })
      .then( res => res.json())
      .then( data => {
        if(data.success){
          alert("season successfully deleted")
        }
      })
      .catch( () => alert("season not deleted"))
      }
    }
  return(
     ( showEpisodePage ? <Episode SelectedWebseriesId={SelectedWebseriesId} CurrentSeasonNumber={CurrentSeasonNumber}  setShowEpisodePage={setShowEpisodePage}/> : <div className='web-series'>
          <div className="title">
            <h3>Web Series Management</h3>
          </div>
          <div className="filter-movie bg-dark">
            <h5>Filter Web Series Movie</h5>
            <div className="row">
                <div className="col-4 col-lg-4 col-md-6 col-sm-12">
                    <div className="languages fitlering-fields">
                      <label htmlFor="">Language:</label>
                      <input type="text" readOnly  placeholder='All language'/>
                    </div>
                </div>
            <div className="col-4 col-lg-4 col-md-6 col-sm-12">
              <div className="genre fitlering-fields">
                <label htmlFor="">Genre:</label>
                <input type="text" readOnly placeholder='All Genre' />
              </div>
            </div>
            <div className="col-4 col-lg-4 col-md-6 col-sm-12">
              <div className="filter-btn">
                   <button className='btn btn-primary'>Clear Filter</button>
              </div>  
            </div>
            </div> 
          </div>
          <div className="container">
              <div className="row">
            <div className="col-3  col-lg-3 col-md-12 col-sm-12">
              <Suspense fallback={<div>Loading...</div>}> 
                 <WebSeriesform SeasonPopUp={setShowSeasonPopUp} setSeasonsCount={setSeasonsCount} setWebseriesId={setWebseriesId}/>
              </Suspense>
             { showSeasonPopUp && <div className="season-pop-up bg-dark" id='season-pop-up'>
                <Suspense fallback={<div>Loading...</div>}> 
                  <AddSeasons  SeasonsCount={SeasonsCount}  SeasonPopUp={setShowSeasonPopUp} webseriesId={webseriesId} />
                 </Suspense>
              </div>}
              
            </div>
          <div className="col-9 col-lg-9 col-md-12 col-sm-12">
            <div className="web-series-table">
              <div className="h4">Web Series List({webSeries.length})</div>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Director</th>
                    <th>Language</th>
                    <th>Seasons</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    webSeries?.map((ws, ind)=>{
                      return <tr key={ws._id}>
                        <td>{ws.title}</td>
                        <td>{ws.director}</td>
                        <td>{ws.language}</td>
                        <td>
                          {ws.seasons.map((s, si)=>{
                            // console.log("episode data:", s.episodes?.length || 0);
                            return( <div key={si}>
                              <span><b>season{si+1}: {s.title} </b></span><br />
                              <span>epsidoes {s.episodes?.length || 0 }</span><br />
                              <button className='btn btn-primary' onClick={(e)=> ViewEpisodes(e, ws._id, s.seasonNumber)}>View Episodes</button><br />
                              <button className='btn btn-secondary mt-1' onClick={(e)=> ManageSeason(e, ws._id, s.seasonNumber)}>Manage season</button>
                              <button className='btn btn-danger mt-1' onClick={(e)=> DeleteSeason(e, ws._id, s.seasonNumber)}> <i className='bi bi-trash'></i> Season</button>
                            </div>)
                          })}
                        </td>
                        <td className='seasons-block'>
                          <button className='btn btn-primary'onClick={(e)=> ManageSeries(e, ws._id)} >Manage Series</button><br />
                          <button className='btn btn-danger mt-1' onClick={(e)=> DeleteWebseriesDb(e,ws._id)}>Delete Series</button>
                         
                         </td>
                         
                      </tr>
                    
                    })
                  }
              </tbody>
              </table>
              {/* manage season here */}
          { showupdateSeasonForm && <UpdateseasonForm 
           UpdatedSeasonData={UpdatedSeasonData}
            setshowupdateSeasonForm={setshowupdateSeasonForm} 
            setUdatedSeasonData={setUdatedSeasonData}
            SendUpdateSeason ={SendUpdateSeason}
            />
              
              } 
        {     showUpdateSereisForm &&  <UpdateSeriesForm setShowUpdateSeriesForm={setShowUpdateSeriesForm} webseriesId={webseriesId} fetchWebSeries={fetchWebSeries}/>}  
        
         </div>    
          </div>
          </div>
        </div>  
          
       </div> )
  )
}

export default WebSeries