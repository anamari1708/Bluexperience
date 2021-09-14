import axios from "axios";
import React, { useEffect, useState } from "react";
import OfferList from "./OfferList";

function ProcessedOffers() {
  const [offers, setOffers] = useState([]);

  async function getProcessedOffers() {
    const offersRes = await axios.get("/offer/processedoffers/true");

    setOffers(offersRes.data);
  }
  
  useEffect(() => {
    getProcessedOffers();
  }, []);

  return (
    <div className="container">
      <h3 className="naslov processed-off"> PROCESSED OFFERS </h3>
      <OfferList offers={offers} />
    </div>
  );
}

export default ProcessedOffers;