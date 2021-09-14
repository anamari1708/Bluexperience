const router = require("express").Router();
const Work = require("../models/WorkModel")
const checkauth = require("../middleware/auth")
const admin = require("../middleware/admin")
const multer=require("multer")

let random1
let random2

function setNumbers(){
    random1 = Math.floor(Math.random() * 999999);
    random2 = Math.floor(Math.random() * 999999); 
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    setNumbers()
    callback(null,"./frontend/public/uploads/")
  },
  filename: (req, file, callback) => {
    callback(null, random1+random2+file.originalname) //original name is name of the image
  }
})

const upload = multer({storage: storage})

router.post("/", checkauth, admin, upload.single("workimage"), async (req, res) => {
  try {
        const newWork= new Work({
            workname : req.body.workname,
            place: req.body.place, 
            begining: req.body.begining,
            howlong: req.body.howlong,
            salary: req.body.salary,
            details: req.body.details,
            mailsender: req.body.mailsender,
            workimage : random1+random2+req.file.originalname
        })


        const savedWork=await newWork.save()
        .then(() => res.json("Article is ADDED successfully"))
    }
    catch (err) {
        console.error(err);
        return res.status(400).json({ errorMessage: "Error: check are you enter all required fields.",});
      }
});

//to get all works in the database
router.get("/", async (req, res) => {
  try {
    const works=await Work.find();
    res.json(works);
  }
    catch (err) {
        console.error(err);
        res.status(500).send();
      }
});

//request find work by id
router.get('/:id',async (req, res) => {
   Work.findById(req.params.id)
   .then(work=>res.json(work))
   .catch(err => res.status(400).json(`Error: ${err}`))
});

//request find article by id and delete
router.delete('/delete/:id',async (req,res) => {
  Work.findByIdAndDelete(req.params.id)
  .then(() => res.json("Article is DELETED successfully"))
  .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports=router;

//find work by name
router.get("/findwork/:query", async (req, res) => {
  try {
    var query = req.params.query.toString();
    if(query.length===1 || query.length===2)
        return res.status(403).json({ errorMessage: "Please eneter more letters!",});

    const found = await Work.find({"workname": { "$regex": query, "$options": "i" }});

    if(found.length!==0)
      res.json(found)
  
   else 
      return res.status(404).json({ errorMessage: "There is no work with this name!"});

    }
    catch (err) {
        console.error(err);
        return res.status(400).json({ errorMessage: "Error: something went wrong.",});
      }
});


