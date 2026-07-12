const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const accessToken = req.cookies.accessToken;

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_PUBLIC_KEY, {
      algorithms: ["RS256"],
    });

    req.user = decoded;
    console.log("auth");

    return next();
  } catch (error) {
    const isApiRequest =
      req.originalUrl.startsWith("/api") ||
      req.headers.accept?.includes("application/json");

    console.error(error);

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      if (error.message === "jwt must be provided") {
        console.log("Токена нет!");
      }
      if (error.message === "invalid token") {
        console.log("Внимание! Кто-то пытается подделать токен!");
      }

      if (isApiRequest) {
        return res
          .status(401)
          .json({ code: "TOKEN_EXPIRED", message: "Сессия истекла." });
      } else {
        return res.redirect("/login?error=session_expired");
      }
    }

    if (isApiRequest) {
      return res.status(403).json({ message: "Доступ запрещен." });
    } else {
      return res.redirect("/login?error=unknown");
    }
  }
}

module.exports = authMiddleware;
