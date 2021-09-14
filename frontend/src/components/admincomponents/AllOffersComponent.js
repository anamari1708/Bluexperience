import axios from "axios";
import React, { useEffect, useState } from "react";
import OfferList from "./OfferList";
import { Link } from "react-router-dom";
import Zoom from 'react-reveal/Zoom';

function Offers() {
  const [offers, setOffers] = useState([]);

  async function getOffers() {
    const offersRes = await axios.get("/offer/alloffers");

    setOffers(offersRes.data);
  }
  
  useEffect(() => {
    getOffers();
  }, []);

  return (
    <div>
      
      <div className="input-group container">
        <div className="processed-btns">
          <Zoom> <Link to="/onlyprocessed">  <button className="btn btn-success">   ONLY PROCESSED   </button></Link>
          <Link to="/onlyunprocessed">  <button className="btn btn-danger">   ONLY UNPROCESSED   </button></Link></Zoom>
        </div>
      </div>
        <OfferList offers={offers} />
    </div>
  );
}

export default Offers;