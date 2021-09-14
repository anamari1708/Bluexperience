import React from "react";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Details from './components/pages/Details';
import FindCrew from './components/pages/FindCrew';
import FindWork from './components/pages/FindWork';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import TermsAndPrivacy from './components/pages/TermsAndPrivacy';
import { AuthContextProvider } from "./context/AuthContext";
import AllUsers from './components/pages/AllUsers.js';
import AllOffers from "./components/pages/AllOffers";
import ProcessedOffers from "./components/pages/ProcessedOffers";
import UnprocessedOffers from "./components/pages/UnprocessedOffers";
import SendOffer from "./components/pages/SendOffer";

function App() {
  return (
    <AuthContextProvider>
    <Router>
      <Navbar />
      <Switch> 
        <Route exact path='/' extact component={Home}/>
        <Route path='/terms-and-privacy' extact component={TermsAndPrivacy}/> 
        <Route path='/details'  extract component={Details}/>
        <Route path='/find-crew' extact component={FindCrew}/>
        <Route path='/find-work' extact component={FindWork}/>
        <Route path='/all-users' component={AllUsers} /> 
        <Route path='/all-offers' extact component={AllOffers}/>
        <Route path='/onlyprocessed' component={ProcessedOffers} />  
        <Route path='/onlyunprocessed' component={UnprocessedOffers} />  
        <Route path='/send-an-offer' component={SendOffer} />  
        <Route path='/sign-in' extact component={SignIn}/>
        <Route path='/sign-up' extact component={SignUp}/>   
      </Switch>
  </Router>
  </AuthContextProvider>
   );
}

export default App;

