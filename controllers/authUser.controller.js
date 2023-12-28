function authUser(req, res) {
  const { username, password } = req.body;
  if (username && password) res.send("Data recibida");
  if (!username || !password) res.status(400).send("Datos incorrectos");
}

export { authUser };
