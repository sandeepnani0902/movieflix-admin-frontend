import React from 'react'

function UpdateseasonForm({setshowupdateSeasonForm,UpdatedSeasonData, setUdatedSeasonData,SendUpdateSeason}) {
   

 
 function handleseasonInput(e){
    const {name, value} =e.target
    
    setUdatedSeasonData( prev =>({...prev, [name]:value}))
  }
  function  handleseasonform(e){
    e.preventDefault()
        setTimeout(() => {
            submitform()
        }, 500);
    }
    function submitform(){
       SendUpdateSeason()
        // setShowSeasonPopUp(false)
    }

  return (
     <div  className='manageseason'>
            <form action="" onSubmit={(e) =>handleseasonform(e)}>
                <h5 className=''>Update season detail's here.. <button className='btn btn-danger m-0 p-1' onClick={()=> setIsUpdateSeason(false)}><i className='bi bi-x'></i></button>
                <hr />
                </h5> 
                <div className="form-group">
                <label htmlFor="">Title:</label>
                <input type="text" name='title' id='title' onChange={(e)=> handleseasonInput(e)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">SeasonNumber:</label> 
                    <input type="text" value={UpdatedSeasonData?.seasonNumber } name='seasonNumber' id='seasonNumber' />
                </div>
                <button type='submit' className='btn btn-primary mt-3' >update</button>
                <button className='btn btn-danger' onClick={()=> setshowupdateSeasonForm(false)}>close</button>
            </form>
      </div>
  )
}

export default UpdateseasonForm