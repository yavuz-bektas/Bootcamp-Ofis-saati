const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./src/models/user");

mongoose.connect("mongodb://localhost:27017/admin", {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/user", async (req, res, next) => {
  try {
    let data = req.body.allInfom;
    console.log(data);
    const user = new User({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
    });

    await user.save();
    res.json({ test: "ok" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/userget", async (req, res, next) => {
  User.find((err, users)=> {
    return res.status(200).json({
      users
    })
  })

  
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
