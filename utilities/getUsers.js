import getDb from "./connectDb.js";
import { collection, getDocs } from "firebase/firestore";

async function getUsers() {
  const db = getDb();
  const query = await getDocs(collection(db, "users"));
  const users = [];
  query.forEach((user) => users.push(user.data()));
  return users;
}

export default getUsers;
