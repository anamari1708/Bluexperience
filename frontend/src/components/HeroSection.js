import React from 'react';
import '../App.css';
import { Button } from './Button';
import '../css/HeroSection.css';
import {Link} from 'react-router-dom';
import Zoom from 'react-reveal/Zoom'; 

function HeroSection() {
  return (
    <div className='hero-container'>
        
     <video src={require('../assets/videos/ocean-video.mp4').default} autoPlay loop muted />
    
     <Zoom><h1>EXPERIENCE YOU NEED</h1></Zoom>
     <Zoom><p>RESULTS YOU WANT</p></Zoom>

      <div className='hero-btns'>
        <Link to='/find-crew'>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          FIND CREW
        </Button>
        </Link>

         <Link to='/find-work'>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          FIND WORK
        </Button>
        </Link>
       
      </div>
    </div>
  );
}

export default HeroSection;