import React, { useState, useEffect } from "react";
import '../../App.css';
import '../../css/FindCrew.css';
import Footer from '../Footer';
import { Link } from 'react-router-dom'
import axios from "axios";
import Zoom from 'react-reveal/Zoom'; 

function FindCrew() {
    const [admin, setisAdmin] = useState("false");
    const [forcrew, setForcrew] = useState("false");
    const [isHiden, setIsHiden] = useState(true)

    const handleAdd = () => {
        
        setIsHiden(false)   
    }

    async function getisadmin() {
        const res = await axios.get("/auth/isadmin");
        setisAdmin(res.data)
    }
    
    async function getisforcrew() {
        const resforcrew = await axios.get("/auth//forcrew");
        setForcrew(resforcrew.data)
    }
    
    useEffect(() => {
        getisadmin(); 
        getisforcrew();
      }, []);

  return (
    <>
      <div>
            <div id="Gornji-Dio-Crew"> 
                <div id="tekst-crew"> 
                        <h1 id="tekst-crew-h1">- the best crew -<br /><br />
                        - easy deal -<br /><br />
                        - insurance -<br /><br />
                        - commission -<br /><br />
                        - procurement -<br /><br />
                        - service - <br /><br />
                        - repairs - <br /><br />
                        - certificate -</h1>   
                    </div>   
                <div id="prva-slika-div">   <img id="slikaAboutUs" className="img-fluid" src={require('../../assets/images/slikacrew.png').default} alt="foo"/>  </div>   
            </div>
        
        </div>
            <div className="container"> 
                <div className="col-md-12 text-center btn">
                {admin === false && (
                <>
                {forcrew === true && (
                <>
                    <Link to="/send-an-offer"> <button className="btn-lg btn-primary">  SEND US AN OFFER  </button></Link>
                    
                    </>
                )}
                    </>
                )}
                </div>
                <div className="col-md-12 text-center">
                {isHiden && (
                    <div className="col-md-12 text-center btn">
                    <button onClick={handleAdd} className="btn btn-success"> HOW IT WORKS </button>
                </div>
                )}
                </div>
                {!isHiden && (
            <div className="col-md-12 text-center">
                <Zoom><div> 
                        <p className="text"><b>1)</b> You have to sign up (looking for a crew) and sign in<br /><br />
                            <b>2)</b>  After that you will be able to see the button with which you will send us your offer<br /><br />
                            <b>3)</b>  After you submit the offer, we will review and publish it so that the candidates can apply for the position they are looking for!<br /><br />
                            <b>4)</b> When the candidates you are looking for apply, we will contact you by e-mail and send you their CV.<br /><br />
                            <b>Good luck!</b>
                        </p> 
                </div></Zoom>
            </div>)}
        </div>
      </>
  );
}

export default FindCrew;