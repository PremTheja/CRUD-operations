const express = require("express");
const mongoose = require("mongoose");
const User = require("./model");

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://kandadisathvik:pTtDErnGofNnwK42@cluster1.lwadyfq.mongodb.net/", {
  dbName: 'demo',
}).then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch((error) => {
  console.error("Error connecting to MongoDB Atlas:", error);
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ msg: "Error fetching users" });
  }
});

// Add a new user
app.post("/addUser", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const newUser = new User({
      name: name,
      email: email,
      age: age,
    });
    await newUser.save();
    res.status(200).send({ msg: "User successfully added!" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send({ msg: "Error adding user" });
  }
});

/// { 1 , demo , demo@gmail.com , 18 } => {21}
// Update user by ID
// Update user by ID
app.post("/updateUser/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, email, age } = req.body;
  
  try {
    // Find the user by ID
    let user = await User.findById({_id:userId});

    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    // Update user fields if provided in the request body
    if (name) user.name = name;
    if (email) user.email = email;
    if (age) user.age = age;

    // Save the updated user
    await user.save();

    res.status(200).send({ msg: "User details are updated!", data: user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ msg: "Error updating user" });
  }
});


// Delete user by ID
app.delete("/deleteUser/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).send({ msg: "User successfully deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ msg: "Error deleting user" });
  }
});

app.listen(3000, () => console.log("App running on port 3000"));

