import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  //token validation
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env._JWT_SECRET,
      (err, decoded) => {
        if (!err) next();
        if (err) res.status(401).send("Unauthorized: " + err);
      }
    );
  } else {
    res.status(401).send();
  }
}

export default verifyToken;
