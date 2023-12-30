import getDb from "./connectDb.js";
import { getDoc, doc } from "firebase/firestore";
const db = getDb();

async function getUserByUsername(username) {
  try {
    const userRef = doc(db, "users", username);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) return userSnap;
    return null;
  } catch (e) {
    console.log("Error searching user in db:", e);
  }
}

export { getUserByUsername };
