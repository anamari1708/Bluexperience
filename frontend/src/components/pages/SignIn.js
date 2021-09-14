import '../../App.css';
import React, { useState, useContext } from "react"
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthContext from '../../context/AuthContext';
import '../../css/Login.css';
import { Link } from 'react-router-dom'
import Zoom from 'react-reveal/Zoom'; 
import FormContainer from '../FormContainer';


const SignIn= ()=>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function login(e) {
      e.preventDefault();
  
      try {
        const loginData = {
          email,
          password,
        };
  
       
      await axios.post("/auth/login",loginData)

      await getLoggedIn();
      history.push("/");
       
      } catch (err) {
        setErrorMessage(err.response.data.errorMessage)
      }
       
    }


  return (
    <>
            <FormContainer
              image={require('../../assets/images/log-in.jpg').default}>
              <form onSubmit={login}>
                 <Zoom> <p>Please login to your account</p></Zoom>
                  <div class="form-outline mb-4">
                    <input type="email" id="form2Example11" class="form-control" placeholder="Enter email address"
                     onChange={(e)=>setEmail(e.target.value)}
                     value={email}/>
                    <label class="form-label" for="form2Example11">Email</label>
                  </div>
                  <div class="form-outline mb-4">
                    <input type="password" id="form2Example22" class="form-control" placeholder="Enter password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password} />
                    <label class="form-label" for="form2Example22">Password</label>
                  </div>
                  {errorMessage && <div className="error"> <p id="error-text">{errorMessage} </p><br/> </div> } 
                  <button type ="submit" class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">Sign in</button>
        
                  <div class="d-flex align-items-center justify-content-center pb-4">
                    <p class="mb-0 me-2">Don't have an account?</p>
                    <Link to='sign-up'> <button type="button" class="btn btn-outline-danger">Create new</button></Link>
                  </div>
                </form>
              </FormContainer>
    </>
  );
}

export default SignIn;