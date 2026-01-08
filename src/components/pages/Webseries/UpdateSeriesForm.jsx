import React, { useEffect, useState } from 'react'

function UpdateSeriesForm({ setShowUpdateSeriesForm, webseriesId,fetchWebSeries }) {
  const [title, setTitle] = useState('')

 
  function updateSeries(e) {
    e.preventDefault()
   if(!title){
    return  alert("kindly fill the new title")
   }
   fetch(`http://localhost:2025/movieflix/webseries/${webseriesId}/updatetitle`, {
    method:'POST',
    body:JSON.stringify({title}),
    headers:{
        "Content-Type":"application/json"
    }
    })
    .then( res => res.json())
    .then( data => {
        if(data.success){
            setShowUpdateSeriesForm(false)
            alert("successfully updated title")
            
        }
    })
    .catch( err =>{
        alert("server error")
    })
   
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0,0,0,0.9)" // ✅ fixed opacity issue
      }}
    >
      <form
        onSubmit={updateSeries}
        style={{
          width: "300px",
          padding: "20px",
          boxShadow: "0 0 4px white",
          background: "black"
        }}
      >
        <div className="group">
          <label><b>New Title:</b></label>
          <input
            type="text"
            placeholder="Change your title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: "10px", marginTop: "10px" }}>
          <button type="submit" className="btn btn-primary">
            Update
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setShowUpdateSeriesForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateSeriesForm
