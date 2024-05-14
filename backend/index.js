const express = require("express");
const mongoose = require("mongoose");
const User = require("./model");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/CRUD")
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });
//displaying the users on the users page
app.get("/", (req, res) => {
    User.find({})
      .then(users => res.json(users))
      .catch(err => res.status(500).json({ error: err.message }));
  });

  app.get("/getuser/:id", (req,res)=>{
    const id=req.params.id;
    User.findById({_id:id}) // Issue here
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err.message }));
});

//updateing the user
app.put("/updateuser/:id",(req,res)=>{
  const id=req.params.id;
  User.findByIdAndUpdate({_id:id},{
    name:req.body.name,
    email:req.body.email,
    age:req.body.age})

  .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err.message }));
})


//user creation
app.post("/Createuser",(req,res)=>{
  User.create(req.body)
  .then(newUser => res.json(newUser)) 
  .catch(err=>res.json(err))
});
  
//deleteing the user
app.delete("/deleteuser/:id",(req,res)=>{
  const id=req.params.id;
  User.findByIdAndDelete({_id:id})
  .then(newUser => res.json(newUser)) 
  .catch(err=>res.json(err))
})

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});
