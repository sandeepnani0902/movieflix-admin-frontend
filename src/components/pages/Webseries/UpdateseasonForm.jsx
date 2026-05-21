import React from "react";

function UpdateseasonForm({
  setshowupdateSeasonForm,
  UpdatedSeasonData,
  setUdatedSeasonData,
  SendUpdateSeason,
}) {
  
  function handleseasonInput(e) {
    const { name, value } = e.target;

    setUdatedSeasonData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    SendUpdateSeason();
  }

  return (
    // ✅ MODAL BACKDROP
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      {/* MODAL BOX */}
      <div className="bg-slate-800 w-[400px] p-5 rounded-xl shadow-lg relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setshowupdateSeasonForm(false)}
          className="absolute top-2 right-2 text-red-600 font-bold text-lg"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">
          Update Season
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* TITLE */}
          <div>
            <label className="text-sm">Title</label>
            <input
              type="text"
              name="title"
              value={UpdatedSeasonData?.title || ""}
              onChange={handleseasonInput}
              className="w-full border p-2 rounded mt-1"
              placeholder="Enter season title"
            />
          </div>

          {/* SEASON NUMBER (READ ONLY) */}
          <div>
            <label className="text-sm">Season Number</label>
            <input
              type="text"
              name="seasonNumber"
              value={UpdatedSeasonData?.seasonNumber || ""}
              readOnly
              className="w-full text-black border p-2 rounded mt-1 bg-gray-100"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2 pt-3">

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Update
            </button>

            <button
              type="button"
              onClick={() => setshowupdateSeasonForm(false)}
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

export default UpdateseasonForm;


// import React from 'react'

// function UpdateseasonForm({setshowupdateSeasonForm,UpdatedSeasonData, setUdatedSeasonData,SendUpdateSeason}) {
   

 
//  function handleseasonInput(e){
//     const {name, value} =e.target
    
//     setUdatedSeasonData( prev =>({...prev, [name]:value}))
//   }
//   function  handleseasonform(e){
//     e.preventDefault()
//         setTimeout(() => {
//             submitform()
//         }, 500);
//     }
//     function submitform(){
//        SendUpdateSeason()
//         // setShowSeasonPopUp(false)
//     }

//   return (
//      <div  className='manageseason'>
//             <form action="" onSubmit={(e) =>handleseasonform(e)}>
//                 <h5 className=''>Update season detail's here.. <button className='btn btn-danger m-0 p-1' onClick={()=> setIsUpdateSeason(false)}><i className='bi bi-x'></i></button>
//                 <hr />
//                 </h5> 
//                 <div className="form-group">
//                 <label htmlFor="">Title:</label>
//                 <input type="text" name='title' id='title' onChange={(e)=> handleseasonInput(e)}/>
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="">SeasonNumber:</label> 
//                     <input type="text" value={UpdatedSeasonData?.seasonNumber } name='seasonNumber' id='seasonNumber' />
//                 </div>
//                 <button type='submit' className='btn btn-primary mt-3' >update</button>
//                 <button className='btn btn-danger' onClick={()=> setshowupdateSeasonForm(false)}>close</button>
//             </form>
//       </div>
//   )
// }

// export default UpdateseasonForm