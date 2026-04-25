import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import {Form, Container, Row, Col, Table} from 'react-bootstrap';
import '../pagescss/language.css'
import axios from 'axios'
import Tabledata from './Tabledata';
function Languages() {
  const [languageslist, setLanguageslist] = useState([])
  const [language, setLanguage] = useState("")

      const getlanguages = async()=>{
      try{
         const res = await fetch("http://localhost:2025/movieflix/languages", 
        {method:"get"}
      )
      const data = await res.json() 
      console.log(data.data)
      setLanguageslist(data.data)
      } 
      catch(err){
        console.error(err)
      } 
    }

  useEffect(()=>{
    getlanguages()
   
  },[])

     async function savelanguage(){
      try {
        
         const response = await axios.post(`http://localhost:2025/movieflix/language`, {language:language})
         if(response.data.success){
          console.log("language added successfully")
         }else{
          console.log("language not added")
         }
         getlanguages()
         setLanguage("")

      } catch (error) {
        console.log("error:",error)
      }
    }
    function handledelete(_id){
      if(confirm("are you sure to delete long")){
        fetch(`http://localhost:2025/movieflix/language/${_id}`, {
          method:"DELETE",
          headers: {
          "Content-Type": "application/json",
        }
        }).then(res => res.json()).then(data => {
          if(data.success){
            console.log("deleted successfully")
            getlanguages()
          }else{
            console.log("not deleted")
          }
        }).catch(err => console.error("Error deleting language:", err));
      }
      else{
        console.log("not deleted...")
      }
    }

    ///pagination
    let [currentpage, setCurrentPage] = useState(1)
    const perpage=5;
    let start = currentpage *  perpage - perpage;
    let end = currentpage * perpage
    console.log(start, end)
    let totalpages = Math.ceil(12/perpage)
    let filtereddata = languageslist.slice(start, end)

  return (
    <div className='language-container'>
      <div className="language-header">
        <h2>Language Management</h2>
        <div className="hr" />
      </div>
      <hr />
      <Container fluid className='contianer-language'>
        <Row className="justify-content-md-center gap-2">
          <Col xl={4} lg={4} md={6} xs={12}>
            <div className="form">
               <Form>
                  <Form.Group className="mb-3">
                    <div className='language-subtitle'>
                      <h4>Add New Language</h4>
                    </div>
                    <Form.Label className='p-1' >
                          Language Name:
                      </Form.Label>
                    <Form.Control type="text" className='input bg-white' placeholder="Enter Language Name" value={language} onChange={e => setLanguage(e.target.value) }/>
                    <Button className='primary mt-3' onClick={savelanguage} >Save Language</Button>
                  </Form.Group>
               </Form>
            </div>
          </Col>

          <Col xl={6} lg={7} md={6} xs={12}>
          <div className='language-table'>
                <h3>Language Lists ({languageslist.length > 0 ? languageslist.length : 0 })</h3>
                <hr />
            {/* <table>
              <thead>
                <tr id='headers'>
                  <th>id</th>
                  <th>name</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {languageslist.map((lang, index) => (
                  <tr key={lang._id}>
                    <td>{index + 1}</td>
                    <td>{lang.language}</td>
                    <td style={{color:"red", cursor:'pointer'}} onClick={() =>handledelete(lang._id)}>delete</td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            <Tabledata datatype={language} data={ filtereddata } headers={["Id", "Name", "Action"]} handledelete={handledelete}/>
          </div>
          <div>Page No: 
          <button onClick={()=>{if(currentpage>1) setCurrentPage(prev => prev - 1)}} disabled={currentpage === 1}>prev</button>
          <span>{currentpage}</span>
          <button onClick={()=> {if(currentpage<totalpages) setCurrentPage(prev => prev + 1)}}  disabled={currentpage === totalpages-1}>next</button>
          </div>
          </Col>
        </Row>
      </Container>        
    </div>
 
  )
}

export default Languages