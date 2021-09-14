import axios from "axios";
import React, { useEffect, useState } from "react";
import OfferList from "./OfferList";

function UnprocessedOffers() {
  const [offers, setOffers] = useState([]);

  async function getUnprocessedOffers() {
    const offersRes = await axios.get("/offer/processedoffers/false");

    setOffers(offersRes.data);
  }
  
  useEffect(() => {
    getUnprocessedOffers();
  }, []);

  return (
    <div className="container">
      <h3 className="naslov unprocessed-off"> UNPROCESSED OFFERS </h3>
      <OfferList offers={offers} />
    </div>
  );
}

export default UnprocessedOffers;