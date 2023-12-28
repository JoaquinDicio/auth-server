async function verifyExistence(username) {
  return false;
}

async function addUserToDb(username, password) {
  console.log("New user created");
}

async function registerNewUser(req, res) {
  await verifyExistence();
  await addUserToDb();
  res.status(201).send("User created");
}

export { registerNewUser };
