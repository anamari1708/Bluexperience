import React, { useState } from "react"
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import axios from "axios";
import Zoom from 'react-reveal/Zoom';
import FormContainer from "../FormContainer";

const SendOffer = ()=>{
            const [position, setPosition] = useState("");
            const [expectations, setExpectations] = useState("");
            const [destination, setDestination] = useState("");
            const [numpeople, setNumpeople] = useState("");
            const [detailsforjob, setDetailsforjob] = useState("");
            const [begining, setBegining] = useState("");
            const [howlong, setHowlong] = useState("");
            const [salary, setSalary] = useState("");
            const [userr, SetUser] =useState("");
            const [errorMessage, setErrorMessage] = useState('');
            const history = useHistory();
        

        async function getuserid() {
              const res = await axios.get("/auth/getuserid");
              SetUser(res.data)
          }

      getuserid()

    async function saveOffer(e) {
        e.preventDefault();
        let check=0

        try {
          const registerData = {
            user:userr,
            position,
            expectations,
            destination,
            numpeople,
            detailsforjob,
            begining,
            howlong,
            salary
          };
    
          await axios.post("/offer/",registerData)
          .then(res => alert(res.data)) 
         
        } catch (err) {
          setErrorMessage(err.response.data.errorMessage)     
          check=1
        }

        if(check===0)
          history.push("/");
      }
    return(
             <FormContainer
             image={require('../../assets/images/send-offer.jpg').default}>
        
                <form onSubmit={saveOffer}  encType="multipart/form-data">

                <h1 className="naslov-sign"> SEND AN OFFER </h1>    

                <p id="note"> By sending an offer you agree to our  <Link to="/terms-and-privacy"> Terms & Privacy </Link></p><br/>

                <label for="personalitytraits"><b>Which position you are looking for?</b></label><br/>
                <input type="text" id="form2Example22" class="form-control"  placeholder="e.g. Steward(ess)" name="position" 
                 onChange={(e) => { setPosition(e.target.value);}}
                 value={position}/><br/><br/>
    
                <label for="personalitytraits"><b>Minimum requirements: </b></label><br/>
                <input type="text"  id="form2Example22" class="form-control" placeholder="e.g. unlimited, master 3000gt, chief mate unlimited, ..." name="personalitytraits" 
                 onChange={(e) => { setExpectations(e.target.value);}}
                 value={expectations}/><br/><br/>

                <label for="city"><b>Where is the destination of your boat?</b></label><br/>
                <input type="text"  id="form2Example22" class="form-control" placeholder="e.g. Bahamas" name="position" 
                 onChange={(e) => { setDestination(e.target.value);}}
                 value={destination} /><br/><br/>

                <label for="numpeople"><b>How many people do you need?</b></label><br/> <br/>   
                <input id="numberpeople" type="number"  id="form2Example22" class="form-control" placeholder="0" name="numpeople" 
                 onChange={(e) => { setNumpeople(e.target.value);}}
                 value={numpeople}/><br/><br/><br/>

                <label for="description"><b>Write details for your job, expectations:</b></label><br/>
                <textarea id="description"   id="form2Example22" class="form-control" placeholder="e.g. 27m private motor yacht, sole stewardess needed, can be in a couple with a deck/engineer, I am looking for a worker who is communicative..."
                 onChange={(e) => { setDetailsforjob(e.target.value);}}
                 value={detailsforjob}></textarea><br></br><br/>

                <label for="description"><b>Add begining of work</b></label><br/> 
                <input id="start-month" type="date" name="bday-month"
                onChange={(e) => { setBegining(e.target.value);}}
                value={begining}></input><br/> <br/> <br/>     

                <label for="personalitytraits"><b>For how long you are looking for?</b></label><br/>
                <input type="text"  id="form2Example22" class="form-control" placeholder="e.g. for one year, permanently, just one seasone..." name="position" 
                onChange={(e) => { setHowlong(e.target.value);}}
                value={howlong}/><br/><br/>

                <label for="numpeople"><b>Write salary per mounth in dolars:</b></label><br/> <br/>   
                <input id="numberpeople" type="number"  id="form2Example22" class="form-control" placeholder="0 $" name="numpeople" 
                onChange={(e) => { setSalary(e.target.value);}}
                value={salary}/><br/>

                {errorMessage && <div className="error"> <p id="error-text">{errorMessage} </p><br/> </div> }
                
                <div class="clearfix">
                <button type ="submit" className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">  SEND </button>
    
                </div><br/><br/>
                </form>
                </FormContainer>

    )
}

export default SendOffer;