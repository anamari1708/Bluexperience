import React, { useState, useEffect } from "react"
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Popup from "./Popup";
import '../../css/FindWork.css';
import Zoom from 'react-reveal/Zoom'; 

function WorkList({ works }) {

    const [admin, setisAdmin] = useState("");
    const [forwork, setForwork] = useState("");
    const [Popup_, setButtonPopup] = useState()
    const [userr, SetUser] =useState("");
    const [appliedUsers, setAppliedUsers] = useState([])
    const [btnappliedusers, setbtnappliedusers] =useState(true);
    const [numAppliedUsers, SetnumAppliedUsers] =useState(-1);
    const [found, setWorks] = useState();
    const [Visible, setVisible] = useState(false);
    const [workName, setworkName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [number, setNumber] = useState()
    
    async function getuserid() {
        const res = await axios.get("/auth/getuserid");
        SetUser(res.data)
    }

    async function getisadmin() {
        const res = await axios.get("/auth/isadmin");
        setisAdmin(res.data)
    }
    
    async function getisforwork() {
        const resforwork= await axios.get("/auth/forwork");
        setForwork(resforwork.data)
    }
    
    useEffect(() => {
        getuserid();
        getisadmin(); 
        getisforwork(); 
      }, []);

  
    //delete article by id
    const deleteWork = id =>{
        if(window.confirm("Are you sure you want to delete this job?")){   
            axios.delete(`work/delete/${id}`)
            .then(res => alert(res.data))  
        }  
        window.location.reload()
    }

    async function findAppliedUsers (id, num){
        const resusers=await axios.get(`apply/findappliedusers/${id}`)
        for (let i = 0; i < resusers.data.length-1; i++)
        {
           resusers.data[i]=resusers.data[i]+', \n'
        }
        setAppliedUsers(resusers.data)  
        setbtnappliedusers(false)
        SetnumAppliedUsers(num)
    }

    //const workk= [...works] //da spremimo sve poslove u listu

    const handleAdd = (i) => {     
        setNumber(i)         
        setButtonPopup(true)             
    }

    async function handleClick (id,i) {
        if(window.confirm("Are you sure you want to apply on this job?"))
        {    
            try {
                const applyData = {
                  user:userr,
                  work:id,
                };
          
                axios.post("/apply/",applyData)   
                .then(res => alert(res.data)) 
            
              } catch (err) {
              
                console.error(err); 
                console.log(err.response.data.errorMessage)
                setErrorMessage(err.response.data.errorMessage)     
              }
        }
    }

    async function Search () 
  {
    try {
    const res = await axios.get(`/work/findwork/${workName}`)
    setWorks(res.data)
    setVisible(true)
    setErrorMessage()
     
    } catch (err) {
        setErrorMessage(err.response.data.errorMessage)
        setVisible(false)
        setWorks()
    }
     
  }

    function foundWorks() 
    {
      return found.map((work, i) => {
       
        return  <div> <Zoom>
        <div className="offerdiv text-center">
           <div className="container-work">
               <div id="slika-dio">  <img id="slikawork" src={`/uploads/${work.workimage}`} alt="foo"/> </div>
               <div id="text-dio">  
                   <div id="JobDescriptionPart"> 
                       <div id="naslovi-cards">
                       <h1 className="naslov-text" id="findworknaslov"> {work.workname} </h1>  
                       {admin === true && (
                       <h1 className="naslov-text" id="findworknaslov"> {work.mailsender} </h1>
                       )}
                       <h3 className="podnaslovwork"> {work.place} <br /></h3>
                       </div>
                       <div id="info-cards">
                           <h1 className="text-in-cards">
                               <b>Starting:</b> {work.begining} <br />
                               <b>How long:</b> {work.howlong}<br />
                               <b>Salary: </b> {work.salary}$  <br />
                           </h1>
                           <div id="details-found">  
                                <h1 id="text-details" className="text-in-cards" >          
                                {work.details}
                            </h1>
                            </div>
                       </div>
                   </div>
               </div>
           </div>
          
          {forwork === true && (
               <>
           {admin === false && (
               <>
           <button onClick={()=>handleClick(work._id,i)}  className="btn btn-success btn-apply">  APPLY   </button>
                </>
              )}
                  </>
              )}
           {admin === true && (
               <>
           <button onClick={() => deleteWork(work._id)}  className="btn btn-secondary">  DELETE   </button>
          
           { i !== numAppliedUsers && (
           <button onClick={() => findAppliedUsers(work._id,i)}  className="btn btn-secondary"> SEE APPLIED USERS  </button>
           )}
           {btnappliedusers === false  && numAppliedUsers === i &&(
               <>
                  <div id="appliedUsers"> <h1 className="text-btns"> {appliedUsers} </h1></div>
                </>
              )}
           </>
              )}
       </div>
       </Zoom>
  </div>
      });
    }

  function renderWorks() 
  {
    return works.map((work, i) => {
      return  <div>
      <div className="offerdiv text-center">
         <div className="container-work container">
             <div id="slika-dio">  <img id="slikawork" src={`/uploads/${work.workimage}`} alt="foo"/> </div>
             <div id="text-dio">  
                 <div id="JobDescriptionPart"> 
                     <div id="naslovi-cards">
                     <h1 className="naslov-text" id="findworknaslov"> {work.workname} </h1>  
                     {admin === true && (
                       <h3 className="podnaslovwork"> {work.mailsender} </h3>
                       )}
                     <h3 className="podnaslovwork"> {work.place} <br /></h3>
                     </div>
                     <div id="info-cards">
                         <h1 className="text-in-cards">
                             <b>Starting:</b> {work.begining} <br />
                             <b>How long:</b> {work.howlong}<br />
                             <b>Salary: </b> {work.salary}$  <br />
                         </h1>
                        
                         <div class="col-md-12 text-center">
                            <button onClick={()=>handleAdd(i)} type="button" class="btn btn-primary">DETAILS</button>
                         </div>

                        { i === number && (
                         <Popup trigger={Popup_} setTrigger={setButtonPopup}>
                         <div id="details-open"> 
                             <h1 id="text-details" className="text-in-cards" >              
                              {works[i].details}
                              </h1>
                         </div>
                         </Popup>
                            )}
                     </div>
                 </div>
             </div>
         </div>
        
        {forwork === true && (
             <>
         {admin === false && (
             <>
         <button onClick={()=>handleClick(work._id,i)}  className="btn btn-success btn-apply"> APPLY  </button>
              </>
            )}
                </>
            )}
         {admin === true && (
             <>
             

    <div class="text-center">
         <button onClick={() => deleteWork(work._id)}  className="btn btn-secondary btn-danger"> DELETE  </button>
        
         { i !== numAppliedUsers && (
         <button onClick={() => findAppliedUsers(work._id,i)} className="btn btn-secondary btn-success">  SEE APPLIED USERS   </button>
         )}
         {btnappliedusers === false  && numAppliedUsers === i &&(
             <>
                <div id="appliedUsers"> <h7> {appliedUsers} </h7></div>
              </>
            )}
            </div>
         </>
            )}
     </div>
</div>
    });
  }

  return (
    <>
    <div class="input-group container">
    <div class=" form-outline">
         <input type="text" id="form1" class="form-control" placeholder="Work name..." 
         onChange={(e)=>setworkName(e.target.value)}
         value={workName}/>
         </div>
        <button onClick={() => Search()} type ="submit" className="btn-secondary"> SEARCH BY WORKNAME </button>
        {errorMessage && <div className="container"> <p id="error-text">{errorMessage} </p><br/> </div> } 
    </div>  
    {Visible && (
        <ul>{foundWorks()}</ul>
       )}
       <div className="container all-works">
          <div id="text-div"><h3 id="inner-text"> ALL WORKS </h3></div>
      <ul>{renderWorks()}</ul>
      </div>
    </>
  );
}

export default WorkList;