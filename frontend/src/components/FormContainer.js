
import React, { useState, useContext } from "react"
import Zoom from 'react-reveal/Zoom'; 

const FormContainer= props =>{
  return (
    <>
  <section class="h-100 gradient-form">
  <div class="container py-5 h-100 div-login">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-xl-10">
        <div class="card rounded-3 text-black">
          <div class="row g-0">
            <div class="col-lg-6">
              <div class="card-body p-md-5 mx-md-4">
               {props.children}
              </div>
            </div>
            <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div class=" px-3 py-4 p-md-5 mx-md-4 slikaLogin">
              <Zoom> <img className="img-fluid rounded mx-auto" src={props.image} alt="foo"/> </Zoom>       
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}

export default FormContainer;