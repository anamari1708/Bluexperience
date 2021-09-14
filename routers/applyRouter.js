const router = require("express").Router();
const { json } = require("express");
const Apply = require("../models/ApplyModel")
const User = require("../models/SignUpModels")

   // _______________________ to save who applied for which job ___________________________

router.post("/", async (req, res) => {
    try {

      const { user, work  } = req.body;
      const existing= await Apply.find({})

     for (let i = 0; i < existing.length; i++)
     { 
        let user1=existing[i].user.toString();
        if(user1 === user)
        { 
          let work1=existing[i].work.toString();
          if(work1 === work)
            return res.json("ERROR: You have already applied for this job!");
        }
    }
          const newApply= new Apply({
            user,
            work
          })
  
          await newApply.save()
          .then(() => res.json("You applied successfuly"))
      
      }
      catch (err) {
          console.error(err);
          return res.json("ERROR: Something went wrong.");
        }
  });

  router.get('/findappliedusers/:id', async (req, res)  => {
    try {
      const existing= await Apply.find({})
      work_id=req.params.id.toString();
      let users=[]
      let users_email=[]

     for (let i = 0; i < existing.length; i++)
     { 
        let userr=existing[i].user.toString();
        let workk=existing[i].work.toString();
        if(work_id === workk)
        { 
          users.push(userr)
        }
    }

    for (let i = 0; i < users.length; i++)
    { 
      user_mail=await User.findById(users[i])
      users_email.push(user_mail.email)
    }
    res.json(users_email)     
  }
      catch (err) {
          res.json("Error");
        }
  })
   
  module.exports=router;