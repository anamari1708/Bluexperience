import React from 'react';
import '../../App.css';
import '../../css/AboutUs.css';
import '../../css/Details.css';
import Footer from '../Footer';
import Zoom from 'react-reveal/Zoom'; 

function Details() {
  return (
    <>
    <div className="container-details">
        <Zoom>
        <div className="col-md-12 text-center">
          <h3> CONTACT </h3>  
                <h4 >mail:  bluexperience@gmail.com</h4>
                <h4>mob: +3859167277772 </h4>   
          <div className="container-details"> 
              <h3> OUR LOCATION </h3>     
                      <h4 >Registered Office: Tijardoviceva 15, 2100, Split </h4>
                      <h4>Tel: +385 1900 0107 <br /></h4> <h5>Registered in Croatia</h5>
                      </div>
              </div>
        </Zoom>  
      
        <Zoom>  
          <div className="container-details"> 
            <img id="slikaAboutUs" className="img-fluid rounded mx-auto" src={require('../../assets/images/detailsphoto.jpeg').default} alt="foo"/> 
          </div>
        </Zoom> 
        <Zoom>
        <p className="text details-text"> 
                          Created in 2019. Bluexperience is one of the first and largest online crewing platforms in the world today. We pride ourselves on providing a quality free introductory service for both crew and boats from amateur to professional level.
                          <p><b>How you know it is for you?</b><br /></p>
                          Our goal is to provide volumes of choice for recreational boats and structured quality for professional recruiters.<br /><br />
                          With over 50 crew registering per day, Bluexperience works hard organising and pushing forward the right crew or candidate that suits your crew vacancy.
                          Year on year Bluexperience has surpassed expectation, receiving more and more online traffic as well as increased direct traffic through word of mouth.
                          <br /><br />
                          We value our community and listen to our members, continually developing and changing to improve the service we provide to you.
          </p>
        </Zoom> 
     </div>
     <Footer />
    </>
  );
}


export default Details;