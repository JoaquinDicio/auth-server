import { doc, setDoc } from "firebase/firestore";
import getDb from "../utilities/connectDb.js";

async function verifyExistence(username) {
  return false;
}

async function addUserToDb(username, password, res) {
  const db = getDb();
  await setDoc(doc(db, "users", username), {
    username: username,
    password: password,
  });
  res.status(201).send("Usuario creado");
}

async function registerNewUser(req, res) {
  const { username, password } = req.body;
  await verifyExistence();
  await addUserToDb(username, password, res);
  res.status(201).send("User created");
}

export { registerNewUser };
