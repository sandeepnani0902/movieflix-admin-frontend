import React, { use, useRef } from 'react'
// import AddSeasonForm from './AddSeasonForm'
import { useState } from 'react'
export const AddSeasons = ({SeasonPopUp, SeasonsCount, webseriesId}) => {
  let initialseasons = Array.from({length: SeasonsCount}).reduce((acc, _, index) => {
      acc[`season${index + 1}`] = { title: "", image: null };
      return acc;
    }, {});
    const [seasons, setSeasons] = useState(initialseasons);
    console.log("seasons state:", seasons);
  function ClosePopUp(){
    console.log("close popup");
    SeasonPopUp(false);
  }   
  function handleInput(e, index){
    const {name, value} = e.target;
    const key = `season${parseInt(index) + 1}`;
    setSeasons(prev => ({...prev, [key]: {...prev[key], [name]: value}}));
    // console.log("seasons after input:", seasons);
  }   
  function handlefile(e,index){
    const file = e.target.files[0];
    const {name} = e.target;
    console.log("file selected:", file);
    const key = `season${index + 1}`;
    setSeasons(prev => ({...prev, [key]: {...prev[key], [name]: file}}));

  }  
  function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    Object.entries(seasons).forEach(([key, value]) => {
      formData.append(`${key}_title`, value.title);
      formData.append(`${key}_image`, value.image);
      // formData.append('webseriesId', webseriesId);
    });

    Object.entries(seasons).forEach(([key, value]) => {
      // console.log(`${key} - Title: ${value.title}, Image: ${value.image}`);
      console.log(`${key}_title`, formData.get(`${key}_title`));
      console.log(`${key}_image`, formData.get(`${key}_image`));

    });
    // Now you can send formData to your backend
    // console.log("Submitting seasons:", seasons);
    fetch(`http://localhost:2025/movieflix/webseries/seasons/${webseriesId}`, {
      method: "POST",
      body: formData, 
    })  
    .then(res => res.json())
    .then(data => {
      if(data.success){
        console.log(data.data)
        console.log("Seasons added successfully");
        alert("Seasons added successfully");
        SeasonPopUp(false);
      

      } else {
        console.error("Failed to add seasons");
        alert("Failed to add seasons");
      } 
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
  return (
    <div>
        <button className='btn btn-danger position-absolute top-0 end-0 m-2  font-size-22' onClick={ClosePopUp}>x</button>
        <h5 className='my-4'>Add Seasons for Web series</h5>
        <form>
        {  Array.from({length: SeasonsCount}).map((_, index) => (
             <div key={index} className="seasonform  p-2 border">
                <h6>Season{index + 1}</h6>
            <div className="d-flex gap-5">
                <div className="form-group col-2">
                <label >season Number</label>
                <input className="form-control" value={index + 1} readOnly width="20px"    placeholder="Enter Number of Episodes" />
            </div>
            <div className="form-group col-6">
                <label >Season Title</label>
                <input type="text" className="form-control" name='title'  onChange={(e) =>handleInput(e,index)} placeholder="Enter Season Title" />
            </div>

            </div>
            <div>
                <label > Image</label>
                <input type="file" className="form-control" name="image" onChange={(e) =>handlefile(e, index)}/>
            </div>
            </div>
            ))}
            <div className='d-flex justify-content-between'>
               <button className='btn btn-danger' onClick={ClosePopUp}>close</button>
               <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit}>Add Season</button>
            </div>
          
        </form>
        

    </div>
  )
}
