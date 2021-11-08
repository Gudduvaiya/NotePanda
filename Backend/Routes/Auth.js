const express = require("express");
const user = require("../Models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../Models/Users");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const fetchuser=require('../Middleware/fetchuser')

const JWT_Secret = "NilanjanalovesArindam"; //JWT signature

//Route 1: Create a user using: POST "/api/Auth/createuser".
router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 5 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "enter a valid passord of 6 chars").isLength({ min: 6 }),
  ],
  async (req, res) => {
    //If there are errors return bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check weather the email exist already or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(500)
          .json({error: "Sorry! a user with same email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secupass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secupass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      // Generating a Authtoken
      const authtoken = JWT.sign(data, JWT_Secret);
      console.log("Authorison token is:- " + authtoken);
   
      res.json({ Uploaded: "Successfully" ,authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Something went wrong!");
    }
  }
);
//Route 2: Verify a user using: POST "/api/Auth/login".
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "have to enter a password").exists(),
  ],
  async (req, res) => {
    //If there are errors return bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let usre=await User.findOne({email})
        if(!usre){
          
            return res.status(400).json({error: "Enter a valid details"})
        }
        const compassword=await bcrypt.compare(password, usre.password)
        if(!compassword){
          
            return res.status(400).json({error: "Enter a valid details"})
        }
        else{
            const data = {
                user: {
                  id: user.id,
                },
              }
              const authtoken = JWT.sign(data, JWT_Secret);
              // console.log("Authorison token is(verifying):- " + authtoken);
              console.log("Varification: Successfull" );
              
              res.json({ "Authorison token is:- ": authtoken});
        }
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Internal server error!");
    }
  }
);

//Route 3: Get loggedin User's details using: POST "/api/Auth/getuser".
router.post("/getuser", fetchuser, async (req, res) => {
    try {
      userid=req.user.id
      const user= await User.findById(userid).select("-password")
      res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
})

module.exports = router;
