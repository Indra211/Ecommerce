const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const util = require("util");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { log } = require("console");
const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));
dotenv.config({ path: "./config.env" });
const db_uri = process.env.DB_STR;

mongoose
  .connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected…"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 8080;

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter a password"],
    minlength: 8,
    select: false,
  },
  profilePic: String,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePasswordIndb = async function (pwsd, pswdDB) {
  return await bcrypt.compare(pwsd, pswdDB);
};
const UserModel = mongoose.model("users", userSchema);

const Token = (data) => {
  const access_token = jwt.sign({ user: data }, process.env.ACCESS_SECRET_STR, {
    expiresIn: process.env.ACCESS_TOKEN_VALID,
  });
  const refresh_token = jwt.sign(
    { user: data },
    process.env.REFRESH_SECRET_STR,
    {
      expiresIn: process.env.REFRESH_TOKEN_VALID,
    }
  );
  return { access_token, refresh_token };
};

app.post("/signup", async (req, res) => {
  try {
    const { email } = req.body;
    const user = req.body;
    const userExists = await UserModel.findOne({ email: email });
    if (userExists) {
      return res.status(200).json({
        message: "User already exists. Please login.",
        status: "error",
        data: "",
      });
    }
    const newUser = await UserModel.create(req.body);
    res.status(201).json({
      status: "success",
      message: "User account created succesfully",
      data: {
        user: email,
        token: Token({ ...user, profilePic: "" }),
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
      data: "",
    });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        status: "error",
        message: "Please provide correct details",
      });
    }
    const user = await UserModel.findOne({ email }).select("+password");
    const isMatch = await user.comparePasswordIndb(password, user.password);
    const UserMatch = await UserModel.findOne({ email }).select("-profilePic");
    if (!user || !isMatch) {
      res.status(200).json({
        status: "Warning",
        message: "Details Are not Match Please Provide Correct Details",
        data: "",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Succesfully login",

        data: {
          user: email,
          token: Token(UserMatch),
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
});

app.post("/access_token", (req, res) => {
  const { refresh_Token } = req.body;
  if (!refresh_Token) {
    return res.status(401).json({ error: "Refresh token is required" });
  }

  jwt.verify(refresh_Token, process.env.REFRESH_SECRET_STR, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Refresh token is invalid or expired" });
    }
    const accessToken = jwt.sign(
      { user: user },
      process.env.ACCESS_SECRET_STR,
      { expiresIn: process.env.ACCESS_TOKEN_VALID }
    );

    res.json({
      access_token: accessToken,
    });
  });
});

const protect = async (req, res, next) => {
  try {
    const testToken = req.headers.authorization;
    let token;
    if (testToken && testToken.startsWith("Bearer")) {
      token = testToken.split(" ")[1];
    }
    if (!testToken) {
      next(
        res.status(401).json({
          message: "Prease Provide Authentication Details",
        })
      );
    }
    const decodeToken = await util.promisify(jwt.verify)(
      token,
      process.env.ACCESS_SECRET_STR
    );
    // console.log(decodeToken);
    // req.user = decodeToken;
    // next();
  } catch (err) {
    next(
      res.status(401).json({
        message: err,
      })
    );
  }
  next();
};

app.get("/user", protect, async (req, res) => {
  const { email } = req.query;
  if (!email) {
    res.status(400).json({
      status: "error",
      message: "email required",
      data: "",
    });
  }
  try {
    const UserMatch = await UserModel.findOne({ email });
    res.status(200).json({
      status: "success",
      message: "Succesfully login",
      data: UserMatch,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
      data: "",
    });
  }
});

// Product schema
const prodSchema = mongoose.Schema({
  prod_name: String,
  prod_cat: String,
  prod_pic: String,
  prod_price: String,
  prod_desc: String,
});
const ProdModel = mongoose.model("products", prodSchema);

app.post("/uploadProduct", protect, async (req, res) => {
  try {
    const newProduct = await ProdModel.create(req.body);
    return res.status(201).json({
      message: "Upload Successfully",
      status: "success",
      data: newProduct,
    });
  } catch {
    return res.status(400).json({
      message: "Something Went Wrong",
      status: "error",
      data: "",
    });
  }
});

app.get("/products", async (req, res) => {
  try {
    const prod_data = await ProdModel.find();
    return res.status(201).json({
      message: "Success Fetched",
      status: "success",
      data: prod_data,
    });
  } catch {
    return res.status(400).json({
      message: "Something Went Wrong",
      status: "error",
      data: "",
    });
  }
});

app.listen(PORT, "0.0.0.0", () => console.log(`Server is runnig at ${PORT}`));
