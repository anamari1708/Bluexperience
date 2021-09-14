import axios from "axios";
import React, { useEffect, useState } from "react";
import WorkForm from "./WorkForm";
import WorkList from "./WorkList";
import '../../css/FindWork.css';
import Zoom from 'react-reveal/Zoom'; 

function Works() {
  const [works, setWorks] = useState([]);
  const [isHiden, setIsHiden] = useState(true)

    const handleAdd = () => {
        
        setIsHiden(false)   
    }

  async function getWorks() {
    const worksRes = await axios.get("/work");

    setWorks(worksRes.data);
  }
  
  useEffect(() => {
    getWorks();
  }, []);

  return (
    <div>
      <div className="container">
      {isHiden && (
        <div className="btn">
        <button onClick={handleAdd} className="btn btn-success how-it-works"> HOW IT WORKS </button>
       </div>
      )}
      </div>
      {!isHiden &&  (<>
        <Zoom> <div className="container">
            <p className="text"><b>1)</b> You have to sign up (looking for a work) and sign in.<br /><br />
            <b>2)</b>  After that you will see a button with which you can apply for a particular work.<br /><br />
            <b>3)</b>  After apply, we will we will look at your CV and if you meet the criteria we will send your data to the company.<br /><br />
            <b>4)</b> The company will then have your details and contact you for future cooperation!<br /><br />
            <b>Good luck!</b>
                </p>
            </div></Zoom>
            </> )}
      <WorkForm getWorks={getWorks} /> 
      <WorkList works={works} />
    </div>
  );
}
 

export default Works;