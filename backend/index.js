const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config() // envfile
const user = require("./model/user");
const profile = require("./model/data");
app.use(express.json({ limit: "5mb" }));
app.use(cors());

//connect with mongo db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.post("/register", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const Exist_user = await user.find({ email: data.email });
    if (Exist_user.length > 0) {
      res.send({ error: "Already user exist" });
      return;
    }
    const new_user = await user.create({
      email: data.email,
      password: data.password,
    });
    res.status(200).json({ message: "Received the data successfully" });
  } catch (err) {
    res.send({ error: "Something went wrong !" });
    console.log(err);
    return;
  }
});
// login
app.post("/login", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const check_user = await user.find({
      email: data.email,
      password: data.password,
    });
    if (check_user.length>0) {
      console.log(check_user);
      const check_profile = await profile.find({ email: data.email });
      if (check_profile.length > 0) {
        console.log(check_profile);
        res.status(200).json({ existuser: "Login successfully" });
        return;
      }
      res.status(200).json({ newuser: "Login successfully" });
      return;
    } else {
      console.log("User not found");
      res.json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Something went wrong try again later" });
    return;
  }
});

///profile

app.post("/profile", async (req, res) => {
  const data = req.body;
  try {
    const profile_data = profile.create({
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      organization: data.organization,
      location: data.location,
      address: data.address,
      phone: data.phone,
      dob:data.dob,
      image: data.image,
    });
    res.status(200).json({ message: "Profile Saved" });
    return;
  } catch (err) {
    res.status(500).json({ error: "Something went wrong try again later" });
    return;
  }
});

// get data from display
app.get("/profile", async (req, res) => {
  const email = req.query.email;
  try{
    const data = await profile.find({email : email})
    if(data.length>0){
      console.log(data);
      res.status(200).json(data)
    }
    else{
      res.status(404).json({data_not_found : "data not found"})
      return;
    }
  }catch(err){
      res.send(500).json({error:"something went wrong try again later"})
      return;
  }

});


app.post("/editdata", async (req, res) => {
  const newData = req.body;
  const userEmail = newData.email; // Assuming email is the unique identifier

  try {
    const existingProfile = await profile.findOne({ email: userEmail });

    if (existingProfile) {
      // Update only the specified fields
      const updatedFields = {
        firstname: newData.firstname,
        lastname: newData.lastname,
        organization: newData.organization,
        location: newData.location,
        address: newData.address,
        phone: newData.phone,
        dob: newData.dob,
        image:newData.image
      };

      // Update the existing profile data
      await profile.updateOne({ email: userEmail }, updatedFields);
      
      res.status(200).json({ message: "Profile data updated successfully" });
    } else {
      res.status(404).json({ error: "Profile not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Something went wrong, try again later" });
  }
});



app.listen(process.env.PORT || 3002, () => {
  console.log("server started !");
});
