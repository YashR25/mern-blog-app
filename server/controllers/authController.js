const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error, success } = require("../utils/wrapper");

const signUpController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    if (!email || !password) {
      return res.send(error(400, "please enter all field"));
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send(error(400, "user already exist"));
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: "admin",
      email,
      password: hashedPassword,
    });
    return res.send(success(200, user));
  } catch (e) {
    res.send(error(400, e.message));
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      // res.status(400).send('All fields are required')
      return res.send(error(400, "All fields are required"));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      // res.status(404).send('User not registered')
      return res.send(error(400, "User not registered"));
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      // res.status(403).send("Incorrect password")
      return res.send(error(400, "Incorrect password"));
    }

    const accessToken = generateAccessToken({
      _id: user._id,
    });

    const refreshToken = generateRefreshToken({
      _id: user._id,
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    // res.status(200).json({
    //     accessToken,
    // })

    return res.send(success(200, accessToken));
  } catch (e) {
    return res.send(error(400, e.message));
  }
};

const refreshAccessTokenController = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.jwt) {
    // res.status(401).send('Refresh token in cookie is required')
    return res.send(error(401, "Refresh token in cookie is required"));
  }

  const refreshToken = cookies.jwt;

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY
    );
    const _id = decoded._id;
    const accessToken = generateAccessToken({ _id });
    // return res.status(201).send({ accessToken })
    return res.send(success(201, { accessToken }));
  } catch (error) {
    console.log(error);
    // return res.status(401).send("Invalid refresh key")
    return res.send(error(401, "Invalid refresh key"));
  }
};

const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "15m",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "1y",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

const logoutController = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(201, "logged out"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  loginController,
  signUpController,
  refreshAccessTokenController,
  logoutController,
};
