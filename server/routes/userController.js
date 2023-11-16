const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/UserSchema");

const signup = async (req, res) => {
  try {
    const { username, rollno, email, password } = req.body;

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create a user with the data
    const user = await User.create({
      username: username,
      rollno: rollno,
      email: email,
      password: hashedPassword
    });

    // Respond with the user data
    res.status(201).json({ user });
  } catch (error) {
    // Handle errors here
    console.error("Error during signup:", error);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    // get the email and password off req body
    const { email, password } = req.body;

    // find the user with the requested email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.sendStatus(401);
    }

    // compare sent-in password with the found user password hash
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.sendStatus(401);
    }

    // create a jwt token
    const expirationTime = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, expirationTime: expirationTime }, process.env.SECRETKEY);

    // set the cookie
    res.cookie("Authorization", token, {
      expires: new Date(expirationTime),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === "production"
    });

    // send it
    res.json({ token });
  } catch (error) {
    // Handle errors here
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
}

const logout = (req, res) => {
  try {
    // clear cookie
    res.clearCookie("Authorization");
    res.sendStatus(200);
  } catch (error) {
    // Handle errors here
    console.error("Error during logout:", error);
    res.status(500).send("Internal Server Error");
  }
}

const fetchUser = async (req, res) => {
  try {
    // get id off the url
    const userId = req.params.id;

    // find the notes using that id
    const user = await User.findById(userId);

    // respond with them
    res.json({ gotUser: user });
  } catch (error) {
    // Handle errors here
    console.error("Error during fetchItem:", error);
    res.status(500).send("Internal Server Error");
  }
}

const checkAuth = (req, res) => {
  try {
    console.log(req.user);
    res.sendStatus(200);
  } catch (error) {
    // Handle errors here
    console.error("Error during checkAuth:", error);
    res.status(500).send("Internal Server Error");
  }
}


module.exports = {
  signup: signup,
  fetchUser:fetchUser,
  login: login,
  logout: logout,
  checkAuth: checkAuth
}
