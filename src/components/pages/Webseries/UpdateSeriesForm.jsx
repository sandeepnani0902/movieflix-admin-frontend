import React, { useState } from "react";

function UpdateSeriesForm({
  setShowUpdateSeriesForm,
  webseriesId,
  fetchWebSeries,
}) {
  const [title, setTitle] = useState("");

  async function updateSeries(e) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Kindly fill the new title");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:2025/movieflix/webseries/${webseriesId}/updatetitle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Successfully updated title");

        setShowUpdateSeriesForm(false);

        // refresh list
        if (fetchWebSeries) fetchWebSeries();
      } else {
        alert("Update failed");
      }
    } catch (err) {
      alert("Server error");
      console.error(err);
    }
  }

  return (
    // ✅ MODAL BACKDROP
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      {/* MODAL BOX */}
      <div className="bg-slate-800 w-[380px] p-5 rounded-xl shadow-lg relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setShowUpdateSeriesForm(false)}
          className="absolute top-2 right-3 text-red-600 font-bold text-lg"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">
          Update Web Series Title
        </h2>

        <form onSubmit={updateSeries} className="space-y-4">

          {/* TITLE INPUT */}
          <div>
            <label className="text-sm font-medium">New Title</label>
            <input
              type="text"
              placeholder="Enter new series title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded mt-1 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2 pt-2">

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Update
            </button>

            <button
              type="button"
              onClick={() => setShowUpdateSeriesForm(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded w-full"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default UpdateSeriesForm;


// import React, { useEffect, useState } from 'react'

// function UpdateSeriesForm({ setShowUpdateSeriesForm, webseriesId,fetchWebSeries }) {
//   const [title, setTitle] = useState('')

 
//   function updateSeries(e) {
//     e.preventDefault()
//    if(!title){
//     return  alert("kindly fill the new title")
//    }
//    fetch(`http://localhost:2025/movieflix/webseries/${webseriesId}/updatetitle`, {
//     method:'POST',
//     body:JSON.stringify({title}),
//     headers:{
//         "Content-Type":"application/json"
//     }
//     })
//     .then( res => res.json())
//     .then( data => {
//         if(data.success){
//             setShowUpdateSeriesForm(false)
//             alert("successfully updated title")
            
//         }
//     })
//     .catch( err =>{
//         alert("server error")
//     })
   
//   }

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100vh",
//         position: "fixed",
//         top: 0,
//         left: 0,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "rgba(0,0,0,0.9)" // ✅ fixed opacity issue
//       }}
//     >
//       <form
//         onSubmit={updateSeries}
//         style={{
//           width: "300px",
//           padding: "20px",
//           boxShadow: "0 0 4px white",
//           background: "black"
//         }}
//       >
//         <div className="group">
//           <label><b>New Title:</b></label>
//           <input
//             type="text"
//             placeholder="Change your title here"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div style={{ display: 'flex', gap: "10px", marginTop: "10px" }}>
//           <button type="submit" className="btn btn-primary">
//             Update
//           </button>

//           <button
//             type="button"
//             className="btn btn-danger"
//             onClick={() => setShowUpdateSeriesForm(false)}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default UpdateSeriesForm
