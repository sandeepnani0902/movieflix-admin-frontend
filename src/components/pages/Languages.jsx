
  // export default Languages
  import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../Tables/Table";
import FullPageLoader from "../Loaders/FullPageLoader";
import ButtonLoader from "../Loaders/ButtonLoader";
import { TurkishLira } from "lucide-react";
import TableSkeleton from "../Loaders/TableSkeleton";

function Languages() {
  const [languageslist, setLanguageslist] = useState([]);
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);
const [btnLoading, setBtnLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Fetch
  const getlanguages = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:2025/movieflix/languages");
      const data = await res.json();
      setLanguageslist(data.data || []);
     
    } catch (err) {
      console.error(err);
    }
    finally{
       setLoading(false)
    }
  };

  useEffect(() => {
    getlanguages();
  }, []);

  // 🔹 Add
  const savelanguage = async () => {
    if (!language.trim()) return;
     setBtnLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:2025/movieflix/language",
        { language }
      );

      if (res.data.success) {
        getlanguages();
        setLanguage("");
      }
    } catch (err) {
      console.error(err);
    }
    finally{
      setBtnLoading(false)
    }
  };

  // 🔹 Delete
  const handledelete = async (_id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const res = await fetch(
        `http://localhost:2025/movieflix/language/${_id}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (data.success) {
        getlanguages();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Columns (Correct Pattern)
  const columns = [
        {
      title: "S.No",
      render: (row, index) => (
        <span>{(currentPage - 1) * 5 + index + 1}</span>
      ),
    },
    {
      title: "Language",
      render: (row) => <span>{row.language}</span>,
    },
    {
      title: "Action",
      render: (row) => (
        <button
          onClick={() => handledelete(row._id)}
          className="text-red-400 hover:text-red-500"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">
        Language Management
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 🔥 Form */}
        <div className="bg-slate-800 p-5 rounded-2xl shadow-lg">
          <h2 className="text-lg mb-4">Add Language</h2>

          <input
            type="text"
            placeholder="Enter language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-slate-700 px-3 py-2 rounded-lg outline-none"
          />

          <button
          onClick={savelanguage}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg flex justify-center items-center"
        >
          {btnLoading ? <ButtonLoader /> : "Save"}
        </button>
        </div>

        {/* 🔥 Table */}
        <div className="lg:col-span-2">
           {loading ? (
            <TableSkeleton rows={5} cols={4} />
          ) : 
          (<Table
            title={`Languages (${languageslist.length})`}
            columns={columns}
            data={languageslist}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          /> )}
        </div>

      </div>
      { loading && <FullPageLoader />}
    </div>
  );
}

export default Languages;

  // import React, { useEffect, useState } from 'react'
  // import Button from 'react-bootstrap/Button';
  // import {Form, Container, Row, Col} from 'react-bootstrap';
  // import '../pagescss/language.css'
  // import axios from 'axios'
  // import Tabledata from './Tabledata';
  // import GenreChart from '../Charts/GenreChart';
  // import { data } from 'react-router-dom';
  // import Table from "../Tables/Table"
  // function Languages() {
  //   const [languageslist, setLanguageslist] = useState([])
  //   const [language, setLanguage] = useState("")

  //       const getlanguages = async()=>{
  //       try{
  //         const res = await fetch("http://localhost:2025/movieflix/languages", 
  //         {method:"get"}
  //       )
  //       const data = await res.json() 
  //       console.log(data.data)
  //       setLanguageslist(data.data)
  //       } 
  //       catch(err){
  //         console.error(err)
  //       } 
  //     }

  //   useEffect(()=>{
  //     getlanguages()
    
  //   },[])

  //     async function savelanguage(){
  //       try {
          
  //         const response = await axios.post(`http://localhost:2025/movieflix/language`, {language:language})
  //         if(response.data.success){
  //           console.log("language added successfully")
  //         }else{
  //           console.log("language not added")
  //         }
  //         getlanguages()
  //         setLanguage("")

  //       } catch (error) {
  //         console.log("error:",error)
  //       }
  //     }
  //     function handledelete(_id){
  //       if(confirm("are you sure to delete long")){
  //         fetch(`http://localhost:2025/movieflix/language/${_id}`, {
  //           method:"DELETE",
  //           headers: {
  //           "Content-Type": "application/json",
  //         }
  //         }).then(res => res.json()).then(data => {
  //           if(data.success){
  //             console.log("deleted successfully")
  //             getlanguages()
  //           }else{
  //             console.log("not deleted")
  //           }
  //         }).catch(err => console.error("Error deleting language:", err));
  //       }
  //       else{
  //         console.log("not deleted...")
  //       }
  //     }

  //     ///pagination
  //     let [currentpage, setCurrentPage] = useState(1)
  //     const perpage=5;
  //     let start = currentpage *  perpage - perpage;
  //     let end = currentpage * perpage
  //     console.log(start, end)
  //     let totalpages = Math.ceil(12/perpage)
  //     let filtereddata = languageslist.slice(start, end)

  //   return (
  //     <div className='language-container'>
  //       <div className="language-header">
  //         <h2>Language Management</h2>
  //         <div className="hr" />
  //       </div>
  //       <hr />
  //       <Container fluid className='contianer-language'>
  //         <Row className="justify-content-md-center gap-2">
  //           <Col xl={4} lg={4} md={6} xs={12}>
  //             <div className="form">
  //               <Form>
  //                   <Form.Group className="mb-3">
  //                     <div className='language-subtitle'>
  //                       <h4>Add New Language</h4>
  //                     </div>
  //                     <Form.Label className='p-1' >
  //                           Language Name:
  //                       </Form.Label>
  //                     <Form.Control type="text" className='input bg-white' placeholder="Enter Language Name" value={language} onChange={e => setLanguage(e.target.value) }/>
  //                     <Button className='primary mt-3' onClick={savelanguage} >Save Language</Button>
  //                   </Form.Group>
  //               </Form>
  //             </div>
  //           </Col>

  //           <Col xl={6} lg={7} md={6} xs={12}>
  //           <div className='language-table'>
  //                 <h3>Language Lists ({languageslist.length > 0 ? languageslist.length : 0 })</h3>
  //                 <hr />

  //             {/* <Tabledata datatype={language} data={ filtereddata } headers={["Id", "Name", "Action"]} handledelete={handledelete}/> */}
  //             <Table 
  //             title="Languages"
  //             data={filtereddata}
  //             columns={["Id", "Name", "Action"]}
  //             />
  //           </div>
  //           <div>Page No: 
  //           <button onClick={()=>{if(currentpage>1) setCurrentPage(prev => prev - 1)}} disabled={currentpage === 1}>prev</button>
  //           <span>{currentpage}</span>
  //           <button onClick={()=> {if(currentpage<totalpages) setCurrentPage(prev => prev + 1)}}  disabled={currentpage === totalpages-1}>next</button>
  //           </div>
  //           </Col>
  //         </Row>
  //       </Container>        
  //     </div>
  
  //   )
  // }
