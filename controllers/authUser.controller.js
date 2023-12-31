import { getUserByUsername } from "../utilities/getUserByUsername.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function authUser(req, res) {
  const { username, password } = req.body;
  //data validation
  if (username.trim() == "" || password.trim() == "") {
    res.status(400).send("Please complete all the fields");
    return;
  }
  try {
    const userSnap = await getUserByUsername(username);
    const hash = userSnap.data().password;
    if (userSnap && bcrypt.compareSync(password, hash)) {
      const token = jwt.sign({ username }, process.env._JWT_SECRET);
      res.status(200).json({ msg: "acess garanted", token: token });
    } else {
      res.status(400).send("Invalid credentials, please verify");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server errror");
  }
}

export { authUser };
