import { doc, getDoc, setDoc } from "firebase/firestore";
import getDb from "../utilities/connectDb.js";
import { getUserByUsername } from "../utilities/getUserByUsername.js";
import bcrypt from "bcryptjs";
const db = getDb();

async function verifyExistence(username, res) {
  try {
    //tries to search for the username in db
    const user = await getUserByUsername(username);
    if (user) {
      res.status(400).send("User already exists");
      return true;
    }
    return false;
  } catch (err) {
    res.status(500).send("Internal server error");
    console.log(err);
  }
}

async function addUserToDb(username, password, res) {
  //enc password
  const hashPassword = encryptPassword(password);
  await setDoc(doc(db, "users", username), {
    username: username,
    password: hashPassword,
  });
  res.status(201).send("User created successfully");
}

function encryptPassword(password) {
  //encrypting password
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
}

async function registerNewUser(req, res) {
  const { username, password } = req.body;
  try {
    const existence = await verifyExistence(username, res);
    if (!existence) await addUserToDb(username, password, res);
  } catch (err) {
    console.log(err);
  }
}

export { registerNewUser };
