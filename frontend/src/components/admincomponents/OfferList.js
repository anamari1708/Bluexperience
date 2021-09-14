import React, { useState } from "react"
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Zoom from 'react-reveal/Zoom';
import '../../css/AllUsers.css';

function OfferList({ offers }) {
  const [userDetails, setUserDetails] = useState('');
  const [number, setNumber] = useState(-1);

  const history = useHistory();

  async function findUser(id,i) {
    const usersRes = await axios.get(`/auth/getdetails/${id}`)
    setNumber(i)
    setUserDetails(usersRes.data);
  }

  async function handleClick (id,i) {
    if(window.confirm("Are you sure you want make this offer PROCESSED?"))
    {    
      const updatedPost = {
        status: true
      };
        try {
             await axios.put(`/offer/update/${id}`, updatedPost)
             .then(res => alert(res.data)) 
            history.push("/");
            history.push("/alloffers");
                
          } catch (err) {
          
            console.error(err); 
          }
    }
}

async function handleClick_ (id,i) {
  if(window.confirm("Are you sure you want make this offer UNPROCESSED?"))
  {    
    const updatedPost = {
      status: false
    };
      try {
           await axios.put(`/offer/update/${id}`, updatedPost)
           .then(res => alert(res.data)) 
           window.location.reload()
        
        } catch (err) {
        
          console.error(err);     
        }
  }
}

  function renderOffers() 
  {
    return offers.map((offer, i) => { 
      return  <div className="container">   
      <Zoom>
                <div className="card btn offers">
                { i !== number && (
                <div className="col-md-12 text-center btn">
                  <button onClick={()=>findUser(offer.user,i) }  className="btn btn-primary">  SENDER DETAILS  </button>
                </div>
                )}
                { i === number && (
                  <>
                 <h5> {userDetails.fullName}  </h5>
                 <h5> {userDetails.email}  </h5> 
                 <h5> {userDetails.country}  </h5> 
                 <h5> {userDetails.postDate}  </h5> 
                </>
                )}
                    <h3>  <b>Position</b>: {offer.position}   </h3>
                    <h5>  <b>Expectations</b>: {offer.expectations}  </h5>
                    <h5>  <b>Destination</b>: {offer.destination}  </h5>
                     <h5> <b>Numpeople</b>: {offer.numpeople}   </h5>
                     <h5> <b>Details</b>: {offer.detailsforjob}   </h5>
                     <h5> <b>Begining</b>: {offer.begining}     </h5>
                     <h5> <b>How long</b>: {offer.howlong}   </h5>
                     <h5> <b>Salary</b>: {offer.salary}$    </h5>
                     <h5> <b>Processed</b>: {offer.processed.toString()}    </h5>
                    {offer.processed.toString() === 'false' &&
                     <div className="col-md-12 text-center btn">
                        <button className="btn btn-success" onClick={()=>handleClick(offer._id,i)}>  MAKE PROCESSED  </button>
                    </div>
                    }
                     {offer.processed.toString() === 'true' &&
                      <div className="col-md-12 text-center btn">
                        <button className="btn btn-danger" onClick={()=>handleClick_(offer._id,i)}>  MAKE UNPROCESSED </button>
                    </div>
                    }
                </div>
                </Zoom>
        </div>
    });
  }

  return (
    <>
      <div style={{marginTop: '30px'}}>
      {renderOffers()} 
    </div>
   </>
  );
}

export default OfferList;