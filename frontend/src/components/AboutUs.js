import '../css/AboutUs.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import Zoom from 'react-reveal/Zoom'; 

const AboutUs = ()=>{
    const [admin, setisAdmin] = useState("");

    async function getisadmin() {
        const res = await axios.get("/auth/isadmin");
        setisAdmin(res.data)
    }

    useEffect(() => {
        getisadmin(); 
      }, []);

  return (
    <div className='aboutUs'>
      <div>
            {admin === true && (
             <>
            <div id="admin-btns">
            <Link to="/all-users" style={{ textDecoration: 'none' }}>  <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">    ALL USERS </button></Link>
            <Link to="/all-offers" style={{ textDecoration: 'none' }}>  <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">   ALL OFFERS  </button></Link>
            </div>
            </>
            )}   
               
                </div>
               <Zoom>
                <h1 id="waiting">What are you waiting for?</h1>
                </Zoom>
                <Zoom>
                <p className="text">We welcome you to our free crewing service, which is designed to connect amateur and professional
                     crew with sailing vessels and motor vessels worldwide. We aim to provide you with the means to find exactly what you're
                    looking for and allow you to interact with like minded people. Good luck! <br />We've recently made a defined split between
                    recreational and professional crewing, tailoring the service we provide you to suit your crewing requirements. This
                    also allows progression from one to the other and a way into the world of professional crewing for any budding crew.
                    Your feedback means a lot to us and over the years we've received testimonials that reassure us that the work we 
                    put in has been totally worth it. <br /> Thanks!
                </p>
                </Zoom>
                <Zoom> <img id="slikaAboutUs" className="img-fluid rounded mx-auto" src={require('../assets/images/aboutUs.jpg').default} alt="foo"/> </Zoom>

                <div id="questions">
                <Zoom> <h3>How it works?</h3>
                    <p className="text"> How exactly it works is already explained on the page when you enter "Find crew" or "Find work", depending on what exactly you are looking for.
                    If you have more detailed questions, feel free to contact us by e-mail.</p>
                </Zoom>

                <Zoom> <div id="question">
                    <h3>Why we use this web page?</h3>
                    <p className="text">We use this site to make it easier for you to find a crew or find a job on board. The possibility of such an approach was used and the site was 
                    created in a very simple way so that anyone could manage. For now, we have many satisfied users and we hope that it will remain so.</p>
                  </div>
                </Zoom>
              
            
                  <Zoom>  
                    <h3>Where you can find us?<br /></h3>
                    <p className="text">We are a small company operating from Croatia, a small country in Europe and successfully brings together people looking for a job on board and
                     companies looking for a crew. For any questions you have a contact phone number or e-mail.</p>
                    </Zoom>

                      <Zoom>  <div id="question">
                    <h3>How can you know if you meet the criteria when applying for a job??<br /></h3>
                    <p className="text"> We will review your CV and the requirements requested by a particular company as soon as possible, 
                    and if you meet the criteria, the company will contact you via your email as soon as possible.
                    </p>
                   
                    </div> </Zoom>
                </div>
                
                
            </div>
          
  );
}

export default AboutUs;