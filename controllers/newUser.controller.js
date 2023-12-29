import {
  DocumentReference,
  doc,
  getDoc,
  getDocFromCache,
  setDoc,
} from "firebase/firestore";
import getDb from "../utilities/connectDb.js";
const db = getDb();

async function verifyExistence(username, res) {
  try {
    //tries to search for the username in db
    const userRef = doc(db, "users", username);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
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
  res.status(201).send("Usuario creado");
}

async function registerNewUser(req, res) {
  const { username, password } = req.body;
  try {
    const existence = await verifyExistence(username, res);
    console.log(existence);
    if (!existence) await addUserToDb(username, password, res);
  } catch (err) {
    console.log(err);
  }
}

export { registerNewUser };
