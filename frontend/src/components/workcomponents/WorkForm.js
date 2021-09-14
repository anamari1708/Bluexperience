import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import '../../css/FindWork.css';
import Zoom from 'react-reveal/Zoom'; 

function WorkForm({ getWorks }) {

  const [admin, setisAdmin] = useState("");

  async function getisadmin() {
    const res = await axios.get("/auth/isadmin");
    setisAdmin(res.data)
  }

  useEffect(() => {
    getisadmin(); 
  }, []);


  const [workname, setWorkName] = useState("");
  const [place, setPlace] = useState("");
  const [begining, setBegining] = useState("");
  const [howlong, setHowlong] = useState("");
  const [salary, setSalary] = useState("");
  const [details, setDetails] = useState("");
  const [mailsender, setMailSender] = useState("");
  const [fileName, setFileName] = useState("");

  const [errorMessage, setErrorMessage] = useState('');

  const onChangeFile = e => {
    setFileName(e.target.files[0]);
  }

  const history = useHistory();

  const [isOpened, setIsOpened] = useState(false)
  const [isHiden, setIsHiden] = useState(true)

    const handleAdd = () => {
        setIsOpened(true)
        setIsHiden(false)   
    }

  async function saveWork(e) {
    e.preventDefault();

    try 
    {
       
          const formData = new FormData()
          formData.append("workname", workname)
          formData.append("place", place)
          formData.append("begining", begining)
          formData.append("howlong", howlong)
          formData.append("salary", salary)
          formData.append("details", details)
          formData.append("mailsender", mailsender)
          formData.append("workimage", fileName)

        await axios.post("/work", formData)
        .then(res => alert(res.data)) 
        getWorks();
        window.location.reload()
    } 
    
    catch (err) 
    {
      console.error(err);
      console.log(err.response.data.errorMessage)
      setErrorMessage(err.response.data.errorMessage)
    }

  }

  return (
    <div  className="container" >
      <Zoom>
      <form onSubmit={saveWork} encType="multipart/form-data">
      {admin === true && (
             <>
      {isHiden && (

                         <div className="btn">
                           <button onClick={handleAdd} className="btn btn-primary ">  ADD NEW WORK </button>
                          </div>
                         )}
                           </>
            )}
                         {isOpened &&  (
                         <div id="details-open">   
                         <h5>ADD NEW WORK</h5> 

                            <label for="description"><b>Write name</b></label><br/>
                              <input type="text" id="form2Example22" class="form-control" placeholder="Write name of work" 
                              onChange={(e) => { setWorkName(e.target.value);}}
                              value={workname} /> <br></br><br/>

                            <label for="description"><b>Write email</b></label><br/>
                              <input type="email" id="form2Example22" class="form-control" placeholder="Write mail sender"
                              onChange={(e) => { setMailSender(e.target.value);}}
                              value={mailsender} /> <br></br><br/>   

                            <label for="description"><b>Write place</b></label><br/>
                              <input type="text" id="form2Example22" class="form-control" placeholder="starting position"
                               onChange={(e) => { setPlace(e.target.value);}}
                               value={place} /><br/><br/>

                            <label for="personalitytraits"><b>Starting:</b></label><br/>
                            <input type="text" id="form2Example22" class="form-control" placeholder="e.g. Now, ..."
                             onChange={(e) => { setBegining(e.target.value);}}
                             value={begining}   /><br/><br/>

                          
                            <label for="personalitytraits"><b>For how long you are looking for?</b></label><br/>
                            <input type="text" id="form2Example22" class="form-control" placeholder="e.g. for one year, permanently, just one seasone..."
                             onChange={(e) => { setHowlong(e.target.value);}} 
                             value={howlong} /><br/><br/>

                           <label for="personalitytraits"><b>Salary in dolars:</b></label><br/>
                            <input type="number" id="form2Example22" class="form-control" placeholder="0 $"
                             onChange={(e) => { setSalary(e.target.value);}}
                             value={salary}  /><br/><br/>

                          <label for="description"><b>Write details </b></label><br/>
                          <textarea id="description" id="form2Example22" class="form-control" placeholder="e.g. 27m private motor yacht, 
                          sole stewardess needed, can be in a couple with a deck/engineer..."
                          onChange={(e) => { setDetails(e.target.value);}}
                          value={details} ></textarea>
                          <br></br><br/>

                          <label for="picture"><b>Upload a picture</b> that describes your offer</label><br/> <br/> 
                          <input type="file" fileName="workimage" id="myfile" name="myfile" 
                          onChange={onChangeFile} /><br/> <br/> <br/> 

                          {errorMessage && <div className="error"> <p id="error-text">{errorMessage} </p><br/> </div> }

                            <button className="btn btn-secondary" type="submit">  ADD </button> 
                         </div>
                     )}
      
      </form></Zoom>
    </div>
  );
}

export default WorkForm;