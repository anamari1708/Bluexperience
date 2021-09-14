const router = require("express").Router();
const Offer = require("../models/OfferModel")
const checkauth = require("../middleware/auth")
const multer=require("multer")

// send offer 
router.post("/", checkauth, async (req, res) => {
    try {

      const { user, position, expectations, destination, numpeople, detailsforjob, begining, howlong, salary  } = req.body;

      // validation
      if (!user || !position || !expectations || !numpeople || !detailsforjob || !begining || !howlong || !salary ) 
          return res.status(400).json({ errorMessage: "Please enter all required fields.",});

          const newOffer= new Offer({
            user,
            position,
            expectations,
            destination,
            numpeople,
            detailsforjob,
            begining,
            howlong,
            salary
          })
  
          const savedOffer=await newOffer.save()
          res.json("You have successfully sent us an offer!")
      
      }
      catch (err) {
          console.error(err);
          return res.status(400).json({ errorMessage: "Error: check are you enter all required fields.",});
        }
  });

//to get all offers in the database
router.get("/alloffers", async (req, res) => {
  try {
    const offers=await Offer.find();
    res.json(offers);
  }
    catch (err) {
        console.error(err);
        res.status(500).send();
      }
});

//edit offer
router.put('/update/:id',  async function(req, res){
  const status=req.body.status
  Boolean(status)
  found = await Offer.findById(req.params.id)
  if(!found)
    return res.status(404).json({ errorMessage: "Error: There is no offer you are looking for.",});

  if(found.processed.toString() === status.toString())
    res.json("Note: already done!")
    
  Offer.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        processed: status
      }
    },
    {
      upsert: true
    }
  )
    .then(result => {res.json("Done!")})
    .catch(error =>{res.json(error)})
}) 

//to get all processed/unprocessed offers in the database
router.get("/processedoffers/:statement", async (req, res) => {
  try {
    statement=req.params.statement.toString()
    let boolValue = (statement == "true"); //returns true or false
    const offers=await Offer.find();
    let processed=[]
    let check=0
    let processedoffers=[]
    for (let i = 0; i < offers.length; i++)
   {  
     let offer=offers[i];
     if(offers[i].processed === boolValue){
      check=1
      processed.push(offers[i])
     }
   }

   if(check)
    res.json(processed)
    
  }
    catch (err) {
        console.error(err);
        res.status(500).send();
      }
});

module.exports=router;