import React, { useState } from "react"
import axios from "axios";
import download from 'downloadjs';
import Zoom from 'react-reveal/Zoom';
import '../../css/AllUsers.css';

function UsersList({ users }) {
  const [userMail, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [foundUserss, setFoundUsers] = useState();
  const [Visible, setVisible] = useState(false);

  async function Search () 
  {
    try {
    const res = await axios.get(`/auth/finduser/${userMail}`)
    setFoundUsers(res.data)
    setVisible(true)
    setErrorMessage()
     
    } catch (err) {
        console.error(err); 
        console.log(err.response.data.errorMessage)
        setErrorMessage(err.response.data.errorMessage)
        setVisible(false)
        setFoundUsers()
    } 
  }

  async function getFile(id)
  {
     const res=await axios.get(`/auth/download/${id}`,{
      responseType: 'blob' })
      download(res.data);
  }

  function renderUsers() 
  {
    return users.map((user, i) => {
      return  <div className=" btn btn-secondary users">  
     {user.isAdmin === true && (
                <> <Zoom>
                <div>
                <h4>  ADMIN </h4>  
                <h5> {user.email} <br /></h5>
                </div></Zoom>
            </>
            )} 
           {user.lookingfor === 'crew' && user.isAdmin !== true && (
                <> <Zoom>
                <div>
                <h4>  LOOKING FOR CREW </h4> 
                    <h5> {user.fullName} <br /></h5>
                    <h5> {user.email} <br /></h5>
                    <h5> {user.country} <br /></h5>
                    <h5> {user.postDate} <br /></h5>
                    <div className="d-flex justify-content-center"> <button className=" btn btn-success" onClick={() => getFile(user._id)}> GET DESCRIPTION FILE </button></div>
                </div></Zoom>
            </>
            )} 
            
            {user.lookingfor === 'work' && user.isAdmin !== true && (
             <>
             <Zoom>
                <div className="lists"> 
                <h4>  LOOKING FOR WORK </h4> 
                <h5> {user.fullName} <br /></h5>
                    <h5> {user.email} <br /></h5>
                    <h5> {user.country} <br /></h5>
                    <h5> {user.postDate} <br /></h5>
                    <div className="container d-flex justify-content-center">   <button className=" btn btn-success" onClick={() => getFile(user._id)}> GET DESCRIPTION FILE </button></div>
                </div> </Zoom>
            </>
            )} 
            </div>
    });
  }

  function FoundUsers() 
  {
    return foundUserss.map((user, i) => {
      return  <div className=" btn btn-secondary users">  
     {user.isAdmin === true && (
                <> <Zoom>
                <div>
                <h4>  ADMIN </h4>  
                <h5> {user.email} <br /></h5>
                </div></Zoom>
            </>
            )} 
           {user.lookingfor === 'crew' && user.isAdmin !== true && (
                <> <Zoom>
                <div>
                <h4>  LOOKING FOR CREW </h4> 
                    <h5> {user.fullName} <br /></h5>
                    <h5> {user.email} <br /></h5>
                    <h5> {user.country} <br /></h5>
                    <h5> {user.postDate} <br /></h5>
                    <div className="d-flex justify-content-center"> <button className=" btn btn-success" onClick={() => getFile(user._id)}> GET DESCRIPTION FILE </button></div>
                </div></Zoom>
            </>
            )} 
            
            {user.lookingfor === 'work' && user.isAdmin !== true && (
             <>
             <Zoom>
                <div className="lists"> 
                <h4>  LOOKING FOR WORK </h4> 
                <h5> {user.fullName} <br /></h5>
                    <h5> {user.email} <br /></h5>
                    <h5> {user.country} <br /></h5>
                    <h5> {user.postDate} <br /></h5>
                    <div className="container d-flex justify-content-center">   <button className=" btn btn-success" onClick={() => getFile(user._id)}> GET DESCRIPTION FILE </button></div>
                </div> </Zoom>
            </>
            )} 
            </div>
    });
  }

  return (
    <>
    <div className="input-group container search-part">
    <div className=" form-outline">
         <input type="text" id="form1" class="form-control" placeholder="Work name..." 
        onChange={(e)=>setEmail(e.target.value)}
         value={userMail}/>
         </div>
        <button onClick={() => Search()} type ="submit" className=" btn-secondary"> SEARCH BY EMAIL </button>
        {errorMessage && <div className="container"> <p id="error-text">{errorMessage} </p><br/> </div> } 
    </div>  
    {Visible && (
        <ul>{FoundUsers()}</ul>
       )}
       <div  className="container all-works">
          <div className="container" id="text-div"><h3 id="inner-text"> ALL USERS </h3></div>
      <div className=" all-users">{renderUsers()}</div>
      </div>
    </>
  );
}

export default UsersList;