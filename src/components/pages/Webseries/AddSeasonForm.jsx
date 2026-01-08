import React from 'react'

function AddSeasonForm() {

  return (<>
            <div className="seasonform  p-2 border">
                <h6>Season{no}</h6>
            <div className="d-flex gap-5">
                <div className="form-group col-2">
                <label >season Number</label>
                <input type="number" className="form-control" value={no} readOnly width="20px" placeholder="Enter Number of Episodes" />
            </div>
            <div className="form-group col-6">
                <label >Season Title</label>
                <input type="text" className="form-control" placeholder="Enter Season Title" />
            </div>

            </div>
            <div>
                <label > Image</label>
                <input type="file" className="form-control" />
            </div>
            </div>
            
            
  </>
  )
}

export default AddSeasonForm