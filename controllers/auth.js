const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Токен отсутствует. Войдите в систему." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        code: "TOKEN_EXPIRED",
        message: "Время действия токена истекло. Обновите токен.",
      });
    }

    return res.status(403).json({ message: "Невалидный токен." });
  }
}

module.exports = authMiddleware;
