const User = require("../Schema/UserSchema");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const tokenGenerator = require("../Services/tokenGenerator");

//Register Route
const RegisterUser = async (req, res) => {
  //Checking Already Exists User
  let isAvailable = await User.findOne({ where: { email: req.body.email } });
  if (!isAvailable) {
    // Password Hashing
    const saltRounds = parseInt(process.env.SALT_ROUND || "10");
    hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

    //Create User in DB
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    })
      .then((response) => {
        // signing Jwt Token
        const Logintoken = tokenGenerator(req.body.email);
        res.status(201).json({ message: "User Registered", token: Logintoken });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  } else {
    return res.status(409).json({ message: "User Already exists" });
  }
};

// Login Route
const Login = async (req, res) => {
  // Checking User in DB
  let isAvailable = await User.findOne({
    where: { email: req.body.email },
  });

  if (isAvailable) {
    //Comparing Password
    if (bcrypt.compareSync(req.body.password, isAvailable.password)) {
      const LoginToken = tokenGenerator(req.body.email);
      res.status(201).json({ message: "login success", token: LoginToken });
    } else {
      res.status(400).json({ message: "Email and Password doesn't match" });
    }
  } else {
    return res.status(400).json({ message: "User doesn't Exists" });
  }
};

module.exports = { RegisterUser, Login };
