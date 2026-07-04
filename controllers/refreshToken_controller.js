const path = require("path");
const jwt = require("jsonwebtoken");
const serviceUsers = require("../service/serviceUsers");
const serviceToken = require("../service/serviceToken");

const api = {
  async refreshToken(req, res) {
    const token = req.cookies.refreshToken;

    try {
      const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY, {
        algorithms: ["RS256"],
      });

      const dbToken = await serviceToken.getRefresh(decoded.id_user);

      if (token === dbToken.token.refresh) {
        const accessToken = jwt.sign(
          { id_user: decoded.id_user, username: decoded.username },
          process.env.JWT_PRIVATE_KEY,
          {
            algorithm: "RS256",
            expiresIn: "15m",
          },
        );
        const refreshToken = jwt.sign(
          { id_user: decoded.id_user, username: decoded.username },
          process.env.JWT_PRIVATE_KEY,
          { algorithm: "RS256", expiresIn: "30d" },
        );

        await serviceToken.updateToken({
          refreshToken: refreshToken,
          id_users: decoded.id_user,
        });

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
          maxAge: 15 * 60 * 1000,
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return res.json({ success: true });
      } else {
        res.clearCookie("accessToken", {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        });
        res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        });
        return res.status(403).json({
          success: false,
          message: "Токены не совпали",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(403).json({
        success: false,
        message: "Время действия сессии истекло.",
      });
    }
  },
};

module.exports = api;
