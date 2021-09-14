const router = require("express").Router();
const User = require("../models/SignUpModels")
const bcrypt = require("bcryptjs")
const jwt = require ("jsonwebtoken")
const multer=require("multer");
const { Schema } = require("mongoose");

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
    callback(null, random1+random2+file.originalname) 
  }
})

const upload = multer({storage: storage})


router.post("/", upload.single("descriptionFile"), async (req, res) => {
    try {
        
        const { fullName, email, password, passwordVerify, lookingfor, country } = req.body;
        const descriptionFile = random1+random2+req.file.originalname

        // validation
        if (!fullName || !email || !password || !passwordVerify || !lookingfor || !country) 
            return res.status(400).json({ errorMessage: "Please enter all required fields.",});
    
        if (password.length < 6)
            return res.status(400).json({ errorMessage: "Please enter a password of at least 6 characters.",});
    
        if (password !== passwordVerify)
            return res.status(400).json({errorMessage: "Please enter the same password twice.",})

        const existingUser = await User.findOne({email}) //this returns promise and we need to add async and then we can use await
        if(existingUser)
            return res.status(400).json({ errorMessage: "An account with this email already exists.",});

        // hash the password
        const salt = await bcrypt.genSalt();
        const passwordHash= await bcrypt.hash(password, salt)

        //save a new user account to the db, moramo pratit model za spremanje na bazu iz models file-a
        const newUser= new User({
            fullName,
            email,
            passwordHash,
            lookingfor,
            country,
            descriptionFile})
            const savedUser = await newUser.save();

            // log the user in
            //sign the token
            const token = jwt.sign({
                user: savedUser._id
            }, process.env.JWT_SECRET) //this will crate a token
    
            //send the token in a HTTP-only cookie
            res.cookie("token", token, {
                httpOnly: true,
            }).send();
        
        } catch (err) {
                console.error(err);
                return res.status(500).json({ errorMessage: "Error: check are you enter all required fields.",});
              }
        })

    // _______________________log in___________________________

    router.post("/login", async(req,res) =>{
        try{
            const {email, password } = req.body;

            //--validate--
            if (!email || !password )
                return res.status(400).json({ errorMessage: "Please enter all required fields.",});

            const existingUser = await User.findOne({email});

            //gledamo je li ima account
            if(!existingUser)
                return res.status(401).json({ errorMessage: "Wrong email or password.",});
            
            //gledamo je li unia dobru lozinku
            const passwordCorrecct= await bcrypt.compare(password, existingUser.passwordHash);
            if(!passwordCorrecct)
                return res.status(401).json({ errorMessage: "Wrong email or password.",});
            
             //sign the token
            const token = jwt.sign({
                user: existingUser._id
            }, process.env.JWT_SECRET) //this will crate a token

            //send the token in a HTTP-only cookie
            res.cookie("token", token, {
                httpOnly: true,
            }).send();   

        }
        catch (err) {
            console.error(err);
            res.status(500).send();
          }

    })


      // _______________________ log out ___________________________
      router.get("/logout", async (req,res) => {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        .send();
      });


      // _______________ check is somebody logged in _______________

      router.get("/loggedIn", async(req, res) => {
        try {
          const token = req.cookies.token;
          if (!token) return res.json(false);
      
          jwt.verify(token, process.env.JWT_SECRET);
      
          res.send(true);
        } catch (err) {
          res.json(false);
        }
      });

      // _______________ check is anAdmin _______________
      router.get('/isadmin', async function(req, res){
        try {
            const token = req.cookies.token;
            toekn = token.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user=await User.findById(decoded.user) //decoded.user je id od usera
            if (req.user.isAdmin) {
                res.send(true);
            } 
            else{
                res.send(false)
            }
        }
            catch (err) {
                res.json(false);
              }
        })

    //_______________ check is looking for work _______________
    router.get('/forwork', async function(req, res){
        try {
            const token = req.cookies.token;
            toekn = token.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user=await User.findById(decoded.user) //decoded.user je id od usera
            if (req.user.lookingfor === "work") {
                res.send(true);
            } 
            else{
                res.send(false)
            }
        }
            catch (err) {
                res.json(false);
              }
        })

    //_______________ check is looking for crew _______________
    router.get('/forcrew', async function(req, res){
        try {
            const token = req.cookies.token;
            toekn = token.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user=await User.findById(decoded.user) //decoded.user je id od usera
            if (req.user.lookingfor === 'crew') {
                res.send(true);
            } 
            else{
                res.send(false)
            }
        }
            catch (err) {
                res.json(false);
              }
        })
        
   //_______________ to get user id _______________
   router.get('/getuserid', async function(req, res){
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user=await User.findById(decoded.user) //decoded.user je id od usera
        res.send(decoded.user);
    }
        catch(er) {
            res.json(er);
          }
    })

module.exports = router;

//to get all users in the database
router.get("/allusers", async (req, res) => {
    try {
      const users=await User.find();
      res.json(users);
    }
      catch (err) {
          console.error(err);
          res.status(500).send();
        }
  });

  //find user by id and get back an email
  router.get('/getdetails/:id', async function(req, res){
    try {
        ress = await User.findById(req.params.id)
        if (ress) {
            res.send(ress);
        } 
        else{
            res.send("no user mail")
        }
    }
        catch (err) {
            res.json("loading error");
          }
    })

    //find user by email
    router.get("/finduser/:query", async (req, res) => {
        try {
            var query = req.params.query.toString();
            if(query.length===1 || query.length===2)
                return res.status(403).json({ errorMessage: "Please eneter more letters!",});
    
            const found = await User.find({"email": { "$regex": query, "$options": "i" }});

            if(found.length!==0 && found[0].isAdmin!=true)
                res.json(found)
            else
                return res.status(404).json({ errorMessage: "Error: there is no user with this email.",});
        
          }
          catch (err) {
              console.error(err);
                return res.status(400).json({ errorMessage: "Error: something went wrong.",});
            }
      });

     
      //get description file
    /*  router.get('/download/:id', async (req,res)=>{
        try {
            ress = await User.findById(req.params.id)
        }
            catch (err) {
                res.json("loading error");
              }
        console.log(ress.descriptionFile)
        var x= 'C:/Users/ebccnmr/Desktop/bluexperience_app/frontend/public/uploads/slika7.png';
        res.download(x)
      
    })*/

    router.get('/download/:id',async (req,res)=>{
        const found=await User.findById(req.params.id)
        let x= './frontend/public/uploads/' + found.descriptionFile.toString();
        console.log(x)
        res.download(x)         
    })


  