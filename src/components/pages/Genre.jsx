import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, CardText } from 'react-bootstrap'
// import Tabledata from './Tabledata'
import axios from 'axios'
import '../pagescss/genre.css'
import { useEffect } from 'react'
function Genre() {
  
  const [genrelist, setGenreList] =useState([])
  const [genre, setGenre] = useState("")
  const [category, setCategory] = useState("")
  const headers = ["Id","Genre", "Category","Action"]

   const fetchGenres = async () => {
    try {
      const res = await axios.get("http://localhost:2025/movieflix/genre"); 
      if (res.data.success) {
        setGenreList(res.data.data);
      }
      else{
        console.error("Failed to fetch genres");
      }
     
    } catch (err) {
      console.error("Error fetching genres:", err);
    } 
   
  }
   useEffect(()=>{
      fetchGenres();
    },[])

  async function saveGenre(){
    if( genre && category){
      try{
      const res = await axios.post("http://localhost:2025/movieflix/genre",{genre, category})
      if(res.data.data.success){
        alert("Genre added successfully")
        fetchGenres()
        setGenre("")
        setCategory("")
       
      }
    }
      catch(err){
        console.error(err)
      }
    }
    else{
      alert("kindly check your input details...")
    }
    

  }
  function handledelete(id){
    if(confirm("do want to delete genre")){
      fetch(`http://localhost:2025/movieflix/genre/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    }).then(res => res.json())
    .then(data =>{
      if(data.success){
        alert("genre deleted successfully")
        fetchGenres()
      }
      
    })
    .catch(err => console.error("Error deleting genre:", err));
  }
  else{
    console.error("not deleted...")
  }
  }
  //pagination:
      let [currentpage, setCurrentPage] = useState(1)
      const perpage=5;
      let start = currentpage *  perpage - perpage;
      let end = currentpage * perpage
      console.log(start, end)
      let totalpages = Math.ceil(12/perpage)
      let filtereddata = genrelist.slice(start, end)
  
  return (
    <div className='genre-container'>
       <div className="genre-header">
        <h2>Language Management</h2>
      </div>
      <hr />
        <Container fluid className='contianer-genre'>
        <Row className="justify-content-md-center">
          <Col lg={4} md={6} xs={12}>
            <div className="form">
               <Form>
                  <Form.Group className="mb-3">
                    <div className='genre-subtitle'>
                      <h4>Add New Genre</h4>
                    </div>
                    <Form.Label className='p-1' >
                          Genre Name:
                      </Form.Label>
                    <Form.Control type="text" className='input bg-white' placeholder="Enter Genre Name" value={genre} onChange={e => setGenre(e.target.value) }/>
                     <Form.Label className='p-1' >
                          Category:
                      </Form.Label>
                      <Form.Select size="sm" aria-label="Default select example" value={category} onChange={ e => setCategory(e.target.value)}>
                        <option value="" disabled>-- Select Category --</option>
                        <option value="Movie" >Movie</option>
                        <option value="Web Series">Web Series</option>
                      </Form.Select>
                    <Button className='primary mt-3' onClick={saveGenre} >Save Genre</Button>
                  </Form.Group>
               </Form>
            </div>
          </Col>

          <Col lg={8} md={6} xs={12}>
          <div className='genre-table'>
                <h3>Genre Lists ({genrelist.length})</h3>
                <hr />
            <table>
              <thead>
                <tr id='headers'>
                  {headers.map( (h, index)=>{
                    return <td key={index}>{h}</td>
                  })}
                </tr>
              </thead>
              <tbody>
                {filtereddata?.map( (g, index) => (
                  <tr key={g._id}>
                    <td>{index + 1}</td>
                    <td>{g.genre}</td>
                     <td>{g.category}</td>
                    <td style={{color:"red", cursor:'pointer'}} ><button className='btn btn-danger' onClick={() =>handledelete(g._id)}><i className='bi bi-trash'></i></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <Tabledata datatype={"genre"} data={ genrelist } headers={["Id", "Name", "Action"]} handledelete={handledelete}/> */}
          </div>
           <div>Page No: 
          <button onClick={()=>{if(currentpage>1) setCurrentPage(prev => prev - 1)} }  disabled={currentpage === 1}>prev</button>
          <span>{currentpage}</span>
          <button onClick={()=> {if(currentpage<totalpages) setCurrentPage(prev => prev + 1)}}   disabled={currentpage === totalpages-1}>next</button>
          </div>
          </Col>
        </Row>
      </Container>  
    </div>
  )
}

export default Genre