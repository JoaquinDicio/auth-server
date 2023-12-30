import { doc, getDoc, setDoc } from "firebase/firestore";
import getDb from "../utilities/connectDb.js";
import { getUserByUsername } from "../utilities/getUserByUsername.js";
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
  await setDoc(doc(db, "users", username), {
    username: username,
    password: password,
  });
  res.status(201).send("User created successfully");
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
